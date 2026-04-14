const Appointment = require("../models/Appointment");

// 📌 Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    // 🔥 ADD THIS BLOCK
    if (req.user.role !== "patient") {
      return res.status(403).json({ msg: "Only patients can book appointments" });
    }


    const { doctorId, date, time } = req.body;

    // prevent double booking (same doctor, same slot)
    const existing = await Appointment.findOne({
      doctorId,
      date,
      time
    });

    if (existing) {
      return res.status(400).json({ msg: "Slot already booked" });
    }

    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      date,
      time
    });

    await appointment.save();
    res.json({ msg: "Appointment booked", appointment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get Patient Appointments
exports.getMyAppointments = async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ msg: "Only patients can view their appointments" });
    }

    
    const appointments = await Appointment.find({
      patientId: req.user.id
    }).populate("doctorId", "name email");

    res.json(appointments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get Doctor Appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    // 🔥 ADD THIS
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Only doctors can view appointments" });
    }


    const appointments = await Appointment.find({
      doctorId: req.user.id
    }).populate("patientId", "name email");

    res.json(appointments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update Status
exports.updateStatus = async (req, res) => {
  try {
    // 🔥 ADD THIS
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Only doctors can update status" });
    }


    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(appointment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};