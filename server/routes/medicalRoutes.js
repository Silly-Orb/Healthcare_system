const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addRecord,
  getMyRecords
} = require("../controllers/medicalController");

// Doctor adds record
router.post("/add", authMiddleware, addRecord);

// Patient views records
router.get("/my", authMiddleware, getMyRecords);

module.exports = router;