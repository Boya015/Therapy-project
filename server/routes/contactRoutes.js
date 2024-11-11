const express = require("express");
const { handleContactForm } = require("../controllers/contactController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", authenticateToken, handleContactForm);

module.exports = router;
