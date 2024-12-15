const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = jwt.sign(
        { email: "test@example.com" },  // Replace with user details as needed
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Generated Token:", token);

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};