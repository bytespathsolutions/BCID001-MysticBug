// routes/users.js
import { User } from "../models/user.js"
import express from 'express'

export const usersRouter = express.Router()

usersRouter.post("/register", async (req, res) => {
  const { uid, email, userType, name } = req.body;

  try {
    if (!uid || !email || !userType) {
      return res.status(400).json({
        message: "Missing required fields: uid, email, and userType"
      });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { uid }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    user = new User({ uid, email, userType, name });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

// ✅ API to get user role/userType using UID
usersRouter.get("/getUserRole", async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userType: user.userType });
  } catch (err) {
    console.error("Error fetching user role:", err);
    res.status(500).json({ message: "Server error" });
  }
});