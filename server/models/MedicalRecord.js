const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },
  diagnosis: {
    type: String,
    required: true
  },
  prescription: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);