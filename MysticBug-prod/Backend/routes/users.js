import express from "express";
import { User } from "../models/user.js";
import { Appointment } from "../models/Appointment.js";

export const usersRouter = express.Router();
export const appointmentsRouter = express.Router();

// --- Register User ---
usersRouter.post("/register", async (req, res) => {
  const { uid, email, userType, name } = req.body;

  try {
    if (!uid || !email || !userType) {
      return res.status(400).json({
        message: "Missing required fields: uid, email, and userType",
      });
    }

    let user = await User.findOne({ $or: [{ email }, { uid }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ uid, email, userType, name });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- Get User Role ---
usersRouter.get("/getUserRole", async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userType: user.userType });
  } catch (err) {
    console.error("Error fetching user role:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Create Appointment ---
appointmentsRouter.post("/", async (req, res) => {
  try {
    const { patientName, reason, doctor, date, timeSlot } = req.body;
    if (!date || !timeSlot || !reason) {
      return res
        .status(400)
        .json({ message: "date, timeSlot and reason are required" });
    }
    const appt = new Appointment({ patientName, reason, doctor, date, timeSlot });
    await appt.save();
    return res.status(201).json(appt);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --- Get Appointments in Date Range ---
appointmentsRouter.get("/", async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "start and end query params required" });
    }
    const appts = await Appointment.find({
      date: { $gte: start, $lte: end },
    }).sort({ date: 1, timeSlot: 1 });
    return res.json(appts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});
