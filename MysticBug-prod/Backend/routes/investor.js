import { getAllInvestors, getSpecificInvestor, updateInvestorById } from "../controllers/investor.js";
import express from "express";

export const investorRoutes = express.Router();

// ✅ Get all investors
investorRoutes.get("/get_investors", getAllInvestors);

// get specific investor data
investorRoutes.get('/:uid', getSpecificInvestor)

// Update investor by ID
investorRoutes.put("/update_investor/:id", updateInvestorById);
