exports.handleContactForm = (req, res) => {
    const { name, email, message } = req.body;
    const user = req.user;

    console.log(`Message from ${user.email}:`, message);

    res.status(200).json({ message: "Contact form submitted successfully" });
};
