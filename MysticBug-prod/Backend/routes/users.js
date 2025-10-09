import express from "express";
import { User } from "../models/user.js";
import { Appointment } from "../models/Appointment.js";
import { MedicalRecord } from "../models/medical.js";
import multer from "multer";


export const usersRouter = express.Router();
export const appointmentsRouter = express.Router();
export const medicalRouter = express.Router();

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

// medical records
medicalRouter.get('/', async (req, res) => {
  try {
    const records = await MedicalRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  }
});

// POST /medical_records
medicalRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, email } = req.body;
    const scannedPdf = req.file ? req.file.filename : null;

    if (!name || !email || !scannedPdf) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const record = new MedicalRecord({ name, email, scannedPdf });
    await record.save();

    res.status(201).json({ message: "Medical record uploaded successfully", record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
