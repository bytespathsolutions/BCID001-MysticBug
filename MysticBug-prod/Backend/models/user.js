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
  userType: {
    type: String,
    required: true,
    enum: ["patient", "doctor", "investor", "admin"],
  }
}, {
  timestamps: true
});

export const User = mongoose.model("User", userSchema);
