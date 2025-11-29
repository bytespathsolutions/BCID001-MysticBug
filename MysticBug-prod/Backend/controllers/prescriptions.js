import { Prescription } from "../models/PrescriptionSchema.js"
export const createPrescriptions = async (req, res) => {
  try {
    const { patientId, doctorId, doctorName, medication, notes } = req.body;
    console.log("REQ BODY:", req.body);
    const newPrescription = new Prescription({
      patientId,
      doctorId,
      medication,
      doctorName,
      notes,
      pdfUrl: req.file ? `/uploads/prescriptions/${req.file.filename}` : null
    });

    await newPrescription.save();

    res.status(201).json({
      message: "Prescription created successfully",
      prescription: newPrescription
    });
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ error: error.message });
  }
}
export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const { uid } = req.params;

    const prescriptions = await Prescription.find({ patientId: uid })
      .sort({ createdAt: -1 });

    res.status(200).json({ prescriptions });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ error: error.message });
  }
}