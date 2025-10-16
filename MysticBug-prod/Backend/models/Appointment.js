import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    default: ''
  },
  reason: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Appointment = mongoose.model('Appointment', AppointmentSchema);
