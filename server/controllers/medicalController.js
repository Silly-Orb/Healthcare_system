const MedicalRecord = require("../models/MedicalRecord");
const Appointment = require("../models/Appointment");

// 📌 Add Record (Doctor only)
exports.addRecord = async (req, res) => {
    try {
        if (req.user.role !== "doctor") {
            return res.status(403).json({ msg: "Only doctors allowed" });
        }

        const { patientId, diagnosis, prescription, appointmentId } = req.body;
        
        // 🔥 Validate appointment
        if (appointmentId) {
            const appointment = await Appointment.findById(appointmentId);

            if (!appointment) {
                return res.status(404).json({ msg: "Appointment not found" });
            }

            // ensure doctor is correct
            if (appointment.doctorId.toString() !== req.user.id) {
                return res.status(403).json({ msg: "Not your appointment" });
            }
        }

        
        // 🔥 ADD THIS (validation)
        if (!patientId || !diagnosis || !prescription) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const record = new MedicalRecord({
            patientId,
            doctorId: req.user.id,
            appointmentId,
            diagnosis,
            prescription
        });

        await record.save();

        res.json({ msg: "Record added", record });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📌 Get Patient Records
exports.getMyRecords = async (req, res) => {
    try {
        if (req.user.role !== "patient") {
            return res.status(403).json({ msg: "Only patients allowed" });
        }


        const records = await MedicalRecord.find({
            patientId: req.user.id
        })
            .populate("doctorId", "name email")
            .sort({ createdAt: -1 }); // 🔥 ADD THIS

        res.json(records);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};