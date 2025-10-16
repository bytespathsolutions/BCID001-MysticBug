import express from "express";
import { User } from "../models/user.js";
import { Appointment } from "../models/Appointment.js";
import { MedicalRecord } from "../models/medical.js";
import multer from "multer";
import { Feedback } from "../models/doctorFeedback.js";


export const usersRoutes = express.Router();
export const appointmentsRoutes = express.Router();
export const medicalRoutes = express.Router();
export const patientRoutes = express.Router();
export const doctorRoutes = express.Router();
export const feedbackRouter = express.Router();

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

    // Convert string date to Date object
    const appointmentDate = new Date(date);

    const appt = new Appointment({
      patientName,
      reason,
      doctor,
      date: appointmentDate,
      timeSlot,
    });

    await appt.save();
    console.log(appt)
    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: appt
    });
  } catch (err) {
    console.error("Create appointment error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    })
  }
});

// --- Get Appointments ---
appointmentsRoutes.get("/fetch-all-appointments", async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Fetch all appointments from today onwards
    const appts = await Appointment.find({
      date: { $gte: todayStart },
    }).sort({ date: 1, timeSlot: 1 });

    // Convert "8 AM" etc to 24-hour number
    const parseTimeSlot = (timeSlot) => {
      const [time, period] = timeSlot.split(" ");
      let h = parseInt(time);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h;
    };

    const activeAppointments = appts.filter((appt) => {
      const appointmentDate = new Date(appt.date);
      const appointmentHour = parseTimeSlot(appt.timeSlot);
      const appointmentDateTime = new Date(
        appointmentDate.getFullYear(),
        appointmentDate.getMonth(),
        appointmentDate.getDate(),
        appointmentHour,
        0,
        0
      );

      // Only filter out past hours for today
      const isToday =
        appointmentDate.getFullYear() === now.getFullYear() &&
        appointmentDate.getMonth() === now.getMonth() &&
        appointmentDate.getDate() === now.getDate();

      if (isToday) {
        return appointmentDateTime > now; // remaining hours today
      } else {
        return true; // all future appointments
      }
    });

    return res.json(activeAppointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
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
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const appts = await Appointment.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1, timeSlot: 1 });

    console.log("Filtered appointments:", appts.length);
    return res.status(200).json(appts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error " });
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

doctorRoutes.get('/', async (req, res) => {
  try {
    const dummyDoctorsData = [
      {
        "name": "Dr. Amelia Harper",
        "specialization": "Specialist in Breast Cancer",
        "qualification": "MD, Oncology, Mumbai",
        "experience": "20 Years of Experience",
        "rating": "Rated 4.5/5"
      },
      {
        "name": "Dr. Ethan Bennett",
        "specialization": "Specialist in Colorectal Cancer",
        "qualification": "MD, Surgical Oncology, Mumbai",
        "experience": "20 Years of Experience",
        "rating": "Rated 4.5/5"
      },
      {
        "name": "Dr. Olivia Carter",
        "specialization": "Specialist in Lung Cancer",
        "qualification": "MD, Radiation Oncology, Mumbai",
        "experience": "20 Years of Experience",
        "rating": "Rated 4.5/5"
      },
      {
        "name": "Dr. Noah Davis",
        "specialization": "Specialist in Leukemia",
        "qualification": "MD, Hematology/Oncology, Mumbai",
        "experience": "20 Years of Experience",
        "rating": "Rated 4.5/5"
      },
      {
        "name": "Dr. Sophia Evans",
        "specialization": "Specialist in Prostate Cancer",
        "qualification": "MD, Oncology, Mumbai",
        "experience": "20 Years of Experience",
        "rating": "Rated 4.5/5"
      }
    ]

    res.status(200).json({ doctors: dummyDoctorsData })
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
})

// POST - Submit new feedback
feedbackRouter.post('/feedback', async (req, res) => {
  try {
    const { doctor, rating, feedback, patientName, patientEmail } = req.body;

    if (!doctor || !rating || !feedback) {
      return res.status(400).json({ message: 'Doctor, rating, and feedback are required' });
    }

    const newFeedback = new Feedback({
      doctor,
      rating,
      feedback,
      patientName,
      patientEmail,
      date: new Date()
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Fetch all feedback for a specific doctor
feedbackRouter.get('/feedback', async (req, res) => {
  try {
    const { doctor } = req.query;

    if (!doctor) {
      return res.status(400).json({ message: 'Doctor name is required' });
    }

    const feedbacks = await Feedback.find({ doctor })
      .sort({ date: -1 }) // Latest first
      .lean();

    // Calculate average rating
    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

    res.status(200).json({
      doctor,
      averageRating: parseFloat(avgRating),
      totalReviews: feedbacks.length,
      reviews: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Fetch aggregate ratings for all doctors (for doctor list)
feedbackRouter.get('/feedback/ratings', async (req, res) => {
  try {
    const ratings = await Feedback.aggregate([
      {
        $group: {
          _id: '$doctor',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      },
      {
        $project: {
          doctor: '$_id',
          averageRating: { $round: ['$averageRating', 1] },
          totalReviews: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({ ratings });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /feedback/:id/like
feedbackRouter.put("/feedback/:id/like", async (req, res) => {
  try {
    // Step 1: Get userId from request body
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: "UserId is required" });

    // Step 2: Find the review by ID
    const review = await Feedback.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Step 3: Check if user already liked
    const alreadyLiked = review.likedBy.includes(userId);

    if (alreadyLiked) {
      // Step 4a: If already liked, you can either ignore or undo like
      return res.status(400).json({ message: "User already liked this review" });
    }

    // Step 4b: If user had disliked before, remove dislike
    if (review.dislikedBy.includes(userId)) {
      review.dislikedBy = review.dislikedBy.filter((id) => id !== userId);
      review.disLikes -= 1;
    }

    // Step 5: Add user to likedBy array
    review.likedBy.push(userId);
    review.likes += 1;

    // Step 6: Save updated review
    await review.save();

    // Step 7: Return updated review
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update like" });
  }
});

// PUT /feedback/:id/dislike
feedbackRouter.put("/feedback/:id/dislike", async (req, res) => {
  try {
    // Step 1: Get userId from request body
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: "UserId is required" });

    // Step 2: Find the review by ID
    const review = await Feedback.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Step 3: Check if user already disliked
    const alreadyDisliked = review.dislikedBy.includes(userId);

    if (alreadyDisliked) {
      // Step 4a: If already disliked, ignore or undo
      return res.status(400).json({ message: "User already disliked this review" });
    }

    // Step 4b: If user had liked before, remove like
    if (review.likedBy.includes(userId)) {
      review.likedBy = review.likedBy.filter((id) => id !== userId);
      review.likes -= 1;
    }

    // Step 5: Add user to dislikedBy array
    review.dislikedBy.push(userId);
    review.disLikes += 1;

    // Step 6: Save updated review
    await review.save();

    // Step 7: Return updated review
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update dislike" });
  }
});
