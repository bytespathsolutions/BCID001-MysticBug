import mongoose from "mongoose";

const medicalSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  scannedPdf: {
    type: String,
    required: true
  }, // URL of uploaded PDF
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const MedicalRecord = mongoose.model("MedicalRecord", medicalSchema);
