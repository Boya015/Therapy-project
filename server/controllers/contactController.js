require("dotenv").config(); // Load environment variables
const nodemailer = require("nodemailer");

const sendAppointmentEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Uses email from .env
                pass: process.env.EMAIL_PASS  // Uses password from .env
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: "snemshengupsych@gmail.com", // Therapist's email
            subject: "New Appointment Request",
            text: `You have a new appointment request:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);

        return res.status(200).json({ message: "Appointment request sent successfully!" });

    } catch (error) {
        console.error("Email error:", error.message);
        return res.status(500).json({ error: "Failed to send email." });
    }
};

module.exports = { sendAppointmentEmail };
