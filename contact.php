<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log errors to a file
function logError($message) {
    file_put_contents('error_log.txt', date('Y-m-d H:i:s') . " - " . $message . PHP_EOL, FILE_APPEND);
}

// Include PHPMailer and config file
require 'config.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Initialize PHPMailer
$mail = new PHPMailer(true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate form inputs
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(strip_tags($_POST['message']));

    if (!$email) {
        logError("Invalid email address: " . $_POST['email']);
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;

        // Log SMTP configuration
        logError("SMTP configuration set. Host: " . SMTP_HOST . ", Port: " . SMTP_PORT);

        // Sender and recipient
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress(EMAIL_TO, EMAIL_TO_NAME);
        $mail->addReplyTo($email, $name); // Reply to the user's email

        // Log recipient info
        logError("Sending email to: " . EMAIL_TO);

        // Email content
        $mail->Subject = EMAIL_SUBJECT;
        $mail->Body = "You have received a new contact form submission:\n\n"
                    . "Name: $name\n"
                    . "Email: $email\n"
                    . "Message:\n$message";
        $mail->isHTML(false);

        // Send email
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
