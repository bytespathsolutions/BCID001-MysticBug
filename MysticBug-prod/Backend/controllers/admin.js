import { User } from "../models/user.js";
import { firebaseAdmin } from "../server.js";
import bcrypt from 'bcryptjs'
export const getActiveStatus = async (req, res) => {
  try {
    const activeUsers = await User.countDocuments({ isActive: true });

    res.status(200).json({ activeUsers });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualification,
      designation,
      typeOfDoctor,
      specialistDetails,
      experience,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    // Check if doctor already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }
    // ✅ Create Firebase account
    let firebaseUid;
    try {
      const firebaseUser = await firebaseAdmin.createUser({
        email: email,
        password: password,
        displayName: name,
      });
      firebaseUid = firebaseUser.uid;
      console.log('✅ Firebase account created:', firebaseUid);
    } catch (firebaseError) {
      if (firebaseError.code === 'auth/email-already-exists') {
        // If Firebase account exists, get the UID
        const existingFirebaseUser = await firebaseAdmin.getUserByEmail(email);
        firebaseUid = existingFirebaseUser.uid;
        // Update password to match what admin set
        await firebaseAdmin.updateUser(firebaseUid, {
          password: password,
          displayName: name,
        });
        console.log('✅ Firebase account updated:', firebaseUid);
      } else {
        throw firebaseError;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create doctor with temporary uid (will be updated on first login)
    const newDoctor = new User({
      name,
      email,
      password: hashedPassword,
      uid: firebaseUid, // Temporary UID until they login
      userType: "doctor",
      allowLogin: true,
      isActive: false, // Will be set to true when they login
      qualification,
      designation,
      typeOfDoctor,
      specialization: specialistDetails, // Map to specialization field
      specialistDetails,
      experience,
    });

    await newDoctor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        name: newDoctor.name,
        email: newDoctor.email,
        userType: newDoctor.userType,
      },
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({
      message: "Failed to add doctor",
      error: error.message,
    });
  }
}
export const addInvestor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      income
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    // Check if doctor already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }
    // ✅ Create Firebase account
    let firebaseUid;
    try {
      const firebaseUser = await firebaseAdmin.createUser({
        email: email,
        password: password,
        displayName: name,
      });
      firebaseUid = firebaseUser.uid;
      console.log('✅ Firebase account created:', firebaseUid);
    } catch (firebaseError) {
      if (firebaseError.code === 'auth/email-already-exists') {
        // If Firebase account exists, get the UID
        const existingFirebaseUser = await firebaseAdmin.getUserByEmail(email);
        firebaseUid = existingFirebaseUser.uid;
        // Update password to match what admin set
        await firebaseAdmin.updateUser(firebaseUid, {
          password: password,
          displayName: name,
        });
        console.log('✅ Firebase account updated:', firebaseUid);
      } else {
        throw firebaseError;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create doctor with temporary uid (will be updated on first login)
    const newInvestor = new User({
      name,
      email,
      password: hashedPassword,
      uid: firebaseUid, // Temporary UID until they login
      userType: "investor",
      allowLogin: true,
      isActive: false, // Will be set to true when they login      
      income,
    });

    await newInvestor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      investor: {
        name: newInvestor.name,
        email: newInvestor.email,
        userType: newInvestor.userType,
      },
    });
  } catch (error) {
    console.error("Error adding investor:", error);
    res.status(500).json({
      message: "Failed to add investor",
      error: error.message,
    });
  }
}