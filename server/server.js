const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Connecting routes to server
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// Test protected route
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "Protected route accessed", user: req.user });
});

// Connect Routes
const profileRoutes = require("./routes/profileRoutes");

app.use("/api/profile", profileRoutes);


const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/appointments", appointmentRoutes);


const medicalRoutes = require("./routes/medicalRoutes");

app.use("/api/medical", medicalRoutes);