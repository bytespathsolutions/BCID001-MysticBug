import { createMedicalRecords, getArchievedMedicalRecords, getRecentMedicalRecords } from "../controllers/medical.js";
import express from "express";
import { uploadMedicalRecords } from "../middleware/multer.js";
export const medicalRoutes = express.Router();

// Get recent records (last 30 days)
medicalRoutes.get('/:uid', getRecentMedicalRecords);

// Get archived records (older than 30 days)
medicalRoutes.get('/archived/:uid', getArchievedMedicalRecords);

// POST /medical_records
medicalRoutes.post("/:uid", uploadMedicalRecords.single("file"), createMedicalRecords);
