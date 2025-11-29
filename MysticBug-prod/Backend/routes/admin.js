import { addDoctor, addInvestor, getActiveStatus } from "../controllers/admin.js";
import express from "express";

export const adminRoutes = express.Router();

// GET /admin/active-status
adminRoutes.get("/active-status", getActiveStatus);

// Admin adds doctor
adminRoutes.post("/add-doctor", addDoctor);

// Admin adds investor
adminRoutes.post("/add-investor", addInvestor);