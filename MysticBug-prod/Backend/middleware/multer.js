import multer from 'multer'

const medicalRecordsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/medicalRecords")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const prescriptionsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/prescriptions")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};
export const uploadMedicalRecords = multer({ storage: medicalRecordsStorage, fileFilter })
export const uploadPrescriptions = multer({ storage: prescriptionsStorage, fileFilter })