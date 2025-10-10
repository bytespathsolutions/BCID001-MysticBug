import express from "express";
import { User } from "../models/user.js";
import { Appointment } from "../models/Appointment.js";
import { MedicalRecord } from "../models/medical.js";
import multer from "multer";


export const usersRoutes = express.Router();
export const appointmentsRoutes = express.Router();
export const medicalRoutes = express.Router();
export const patientRoutes = express.Router();

// --- Register User ---
usersRoutes.post("/register", async (req, res) => {
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
usersRoutes.get("/getUserRole", async (req, res) => {
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
appointmentsRoutes.post("/", async (req, res) => {
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

// --- Get Appointments ---
appointmentsRoutes.get("/fetch-all-appointments", async (req, res) => {
  try {
    const now = new Date();

    // Get today's date at midnight (start of day) for MongoDB query
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Fetch all appointments from today onwards
    const appts = await Appointment.find({
      date: { $gte: todayStart.toISOString().split('T')[0] }, // '2025-10-09' format
    }).sort({ date: 1, timeSlot: 1 });

    // Helper function to parse timeSlot (e.g., "8 AM", "2 PM") into hours
    const parseTimeSlot = (timeSlot) => {
      const [time, period] = timeSlot.split(' ');
      let hours = parseInt(time);

      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }

      return hours;
    };

    // Filter out expired appointments
    const activeAppointments = appts.filter((appt) => {
      // Create a Date object from appointment date and timeSlot
      const [year, month, day] = appt.date.split('-').map(Number);
      const appointmentHour = parseTimeSlot(appt.timeSlot);

      const appointmentDateTime = new Date(year, month - 1, day, appointmentHour, 0, 0);
      return appointmentDateTime > now;
    });

    return res.json(activeAppointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --- Get Appointments in Date Range ---
appointmentsRoutes.get("/", async (req, res) => {
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
medicalRoutes.get('/', async (req, res) => {
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
medicalRoutes.post("/", upload.single("file"), async (req, res) => {
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

// Dummy data for now
const dummyPrescriptions = [
  {
    name: "dummy",
    email: "dummy@gmail.com",
    pdf: "https://via.placeholder.com/150",
  },
  {
    name: "dummy",
    email: "dummy@gmail.com",
    pdf: "https://via.placeholder.com/150",
  },
];

const dummyMedicalRecords = [
  {
    name: "dummy",
    email: "dummy@gmail.com",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "dummy",
    email: "dummy@gmail.com",
    image: "https://via.placeholder.com/150",
  },
];

patientRoutes.get('/get_patient_record/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    // ✅ Dummy response for now
    res.status(200).json({
      success: true,
      prescriptions: dummyPrescriptions,
      medicalRecords: dummyMedicalRecords,
    });

    /*
    // 🔒 Later: Use actual doctor schema to fetch records by patient UID 

    const doctor = await Doctor.findOne({ "patients.uid": uid });

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Filter prescriptions and records for the given UID
    const patientData = doctor.patients.find(p => p.uid === uid);
    res.status(200).json({
      success: true,
      prescriptions: patientData.prescriptions,
      medicalRecords: patientData.medicalRecords,
    });
    */
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
})
