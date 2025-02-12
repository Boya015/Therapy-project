<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow cross-origin requests (Modify as needed)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Prevent direct execution from CLI
if (php_sapi_name() === 'cli') {
    echo json_encode(["status" => "error", "message" => "This script should be accessed via a web server."]);
    exit;
}

// Function to log errors
function logError($message) {
    file_put_contents('error_log.txt', date('Y-m-d H:i:s') . " - " . $message . PHP_EOL, FILE_APPEND);
}

// Include PHPMailer and configuration
require 'config.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validate and sanitize inputs
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Check if any field is empty
    if (empty($name) || empty($email) || empty($message)) {
        logError("Validation error: Missing required fields.");
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    try {
        // Initialize PHPMailer
        $mail = new PHPMailer(true);
        $mail->SMTPDebug = 2; // Enable SMTP debugging (1 = Errors, 2 = Messages, 3 = Verbose)
        $mail->Debugoutput = function ($str, $level) {
            logError("SMTP Debug: [$level] $str");
        };

        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;

        // Log SMTP settings
        logError("SMTP settings: Host=" . SMTP_HOST . ", Port=" . SMTP_PORT);

        // Sender & Recipient
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress(EMAIL_TO, EMAIL_TO_NAME);
        $mail->addReplyTo($email, $name);

        // Email Content
        $mail->Subject = EMAIL_SUBJECT;
        $mail->Body = "New contact form submission:\n\n"
                    . "Name: $name\n"
                    . "Email: $email\n"
                    . "Message:\n$message";
        $mail->isHTML(false);

        // Send Email
        if ($mail->send()) {
            logError("Email sent successfully.");
            echo json_encode(["status" => "success", "message" => "Thank you for contacting us!"]);
        } else {
            logError("Mailer Error: " . $mail->ErrorInfo);
            echo json_encode(["status" => "error", "message" => "Message could not be sent."]);
        }
    } catch (Exception $e) {
        logError("Exception: " . $e->getMessage());
        echo json_encode(["status" => "error", "message" => "Mailer Error: " . $e->getMessage()]);
    }
} else {
    logError("Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
