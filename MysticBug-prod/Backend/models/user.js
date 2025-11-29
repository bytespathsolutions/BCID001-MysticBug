import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    default: null
  },
  password: {
    type: String,
    select: false
  },
  userType: {
    type: String,
    required: true,
    enum: ["patient", "doctor", "investor", "admin"],
  },
  isActive: { type: Boolean, default: false },
  allowLogin: { type: Boolean, default: false },
  // Doctor-specific fields (only populated when userType === 'doctor')
  specialization: { type: String },
  qualification: { type: String },
  designation: { type: String },
  typeOfDoctor: { type: String },
  specialistDetails: { type: String },
  experience: { type: String },
  rating: { type: Number, default: 0 },

  // Patient-specific fields (only when userType === 'patient')
  medicalHistory: { type: String },

  // Investor-specific (only when userType === 'patient')
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  profits: {
    type: Number,
    default: 0,
  },
  roi: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});
userSchema.index({ phoneNumber: 1 })
export const User = mongoose.model("User", userSchema);
