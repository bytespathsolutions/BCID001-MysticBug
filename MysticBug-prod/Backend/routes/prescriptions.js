import { createPrescriptions, getPrescriptionsByPatient } from "../controllers/prescriptions.js";
import express from "express";
import { uploadPrescriptions } from "../middleware/multer.js";

export const prescriptionsRoutes = express.Router();


// POST: Create prescription
prescriptionsRoutes.post("/", uploadPrescriptions.single("prescription"), createPrescriptions);

// GET: Prescriptions for specific patient
prescriptionsRoutes.get("/patient/:uid", getPrescriptionsByPatient);
