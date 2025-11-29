import { acceptAppointment, appointmentWithQueryParams, createAppointment, fetchAllAppointments, getAppointmentHistory, getAppointmentsByDateRange, getPatientsOfDoctor, rejectAppointment, todayAppointmentCount } from "../controllers/appointment.js";
import express from "express";

export const appointmentsRoutes = express.Router();

// --- Create Appointment ---
appointmentsRoutes.post("/", createAppointment);

// Accept appointment
appointmentsRoutes.put('/:id/accept', acceptAppointment);

// Reject appointment
appointmentsRoutes.put('/:id/reject', rejectAppointment);

// --- Get Appointments-- -
appointmentsRoutes.get("/fetch_all_appointments", fetchAllAppointments);

// --- Get Appointments in Date Range ---
appointmentsRoutes.get("/", getAppointmentsByDateRange);

// for admin
appointmentsRoutes.get("/today_appointments_count", todayAppointmentCount);

// GET /appointments with query params
appointmentsRoutes.get('/smart_userdata', appointmentWithQueryParams);

// get patients of doctor
appointmentsRoutes.get('/:doctorName', getPatientsOfDoctor)

// GET /api/appointments/history - Get appointment history
appointmentsRoutes.get('/history', getAppointmentHistory);