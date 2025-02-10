const express = require("express");
const { sendAppointmentEmail } = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", sendAppointmentEmail);

module.exports = router;
