const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");


// Create Doctor Profile
exports.createDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, fees } = req.body;

    const userId = req.user.id; // 🔥 important

    // ✅ Prevent duplicate profile
    const existing = await Doctor.findOne({ userId });
    if (existing) {
      return res.status(400).json({ msg: "Profile already exists" });
    }

    const doctor = new Doctor({
      userId,
      specialization,
      experience,
      fees
    });

    await doctor.save();
    res.json(doctor);

  } catch (err) {
    console.log(err); // 🔥 ADD THIS (very important for debugging)
    res.status(500).json({ error: err.message });
  }
};

// Create Patient Profile
exports.createPatientProfile = async (req, res) => {
  try {
    const { age, gender, medicalHistory } = req.body;

    const userId = req.user.id;

    // ✅ Prevent duplicate
    const existing = await Patient.findOne({ userId });
    if (existing) {
      return res.status(400).json({ msg: "Profile already exists" });
    }

    const patient = new Patient({
      userId,
      age,
      gender,
      medicalHistory
    });

    await patient.save();
    res.json(patient);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get All Doctors (VERY IMPORTANT for booking)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

