const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createDoctorProfile,
  createPatientProfile,
  getAllDoctors
} = require("../controllers/profileController");

// Protected routes
router.post("/doctor", authMiddleware, createDoctorProfile);
router.post("/patient", authMiddleware, createPatientProfile);

// Public route
router.get("/doctors", getAllDoctors);

module.exports = router;