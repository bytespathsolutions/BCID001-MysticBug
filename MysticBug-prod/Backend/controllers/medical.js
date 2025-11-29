import { MedicalRecord } from "../models/medical.js";

export const getRecentMedicalRecords = async (req, res) => {
  try {
    const { uid } = req.params
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const records = await MedicalRecord.find({
      uid,
      createdAt: { $gte: thirtyDaysAgo }
    })
      .sort({ createdAt: -1 })
      .limit(7); // Limit to 7 most recent

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export const getArchievedMedicalRecords = async (req, res) => {
  try {
    const { uid } = req.params;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const records = await MedicalRecord.find({
      uid,
      createdAt: { $lt: thirtyDaysAgo }
    })
      .sort({ createdAt: -1 });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export const createMedicalRecords = async (req, res) => {
  try {
    const { name, email } = req.body;
    const scannedPdf = req.file ? req.file.filename : null;
    const { uid } = req.params
    if (!name || !email || !scannedPdf) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const record = new MedicalRecord({ uid, name, email, scannedPdf });
    await record.save();

    res.status(201).json({ message: "Medical record uploaded successfully", record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}