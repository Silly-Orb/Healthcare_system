const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateStatus
} = require("../controllers/appointmentController");

// Patient
router.post("/book", authMiddleware, bookAppointment);
router.get("/my", authMiddleware, getMyAppointments);

// Doctor
router.get("/doctor", authMiddleware, getDoctorAppointments);

// Update
router.put("/:id", authMiddleware, updateStatus);

module.exports = router;