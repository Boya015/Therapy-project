const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Extract the token from the request headers or authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token missing or invalid" });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        // Attach the user data from the token payload to the request
        req.user = user;
        next();
    });
};
