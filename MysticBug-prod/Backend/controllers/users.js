import { User } from "../models/user.js"
export const registerUser = async (req, res) => {
  const { uid, email, userType, name, phoneNumber } = req.body;

  try {
    if (!uid || !userType) {
      return res.status(400).json({
        message: "Missing required fields: uid, and userType",
      });
    }
    // ✅ For phone auth, email is temperory
    const isPhoneAuth = phoneNumber && email?.includes('@phone.temp');

    let user = await User.findOne({
      $or: [
        { uid },
        { email },
        ...(phoneNumber ? [{ phoneNumber }] : [])
      ]
    });

    if (user) {
      // FOR PATIENT: Always allow
      if (userType === "patient") {
        // ✅ Update uid if different (important for phone auth)
        if (user.uid !== uid) {
          user.uid = uid;
        }
        // ✅ Update phone number if provided and not already set
        if (phoneNumber && !user.phoneNumber) {
          user.phoneNumber = phoneNumber;
        }

        // ✅ Update name if provided
        if (name && !user.name) {
          user.name = name;
        }

        user.isActive = true;
        await user.save();

        return res.status(200).json({
          message: "Login successful",
          user,
        });
      }

      // FOR DOCTOR/INVESTOR: Check allowLogin
      if (userType === "doctor" || userType === "investor") {
        if (!user.allowLogin) {
          return res.status(403).json({
            message: "Your account is not approved yet. Please contact the admin.",
          });
        }

        if (user.userType !== userType) {
          return res.status(403).json({
            message: `You are registered as a ${user.userType}. Please use the ${user.userType} login.`,
          });
        }

        // ✅ Update uid if it's temporary or different
        if (user.uid.startsWith('temp_') || user.uid !== uid) {
          user.uid = uid;
        }

        user.isActive = true;
        await user.save();

        return res.status(200).json({
          message: "Login successful",
          user,
        });
      }

      // FOR ADMIN
      if (userType === "admin") {
        user.isActive = true;
        await user.save();

        return res.status(200).json({
          message: "Login successful",
          user,
        });
      }
    }

    // If user doesn't exist
    if (userType === "patient") {
      const newUser = new User({
        uid,
        email: email || `${phoneNumber}@phone.temp`,
        phoneNumber: phoneNumber || null,
        userType,
        name,
        isActive: true,
        allowLogin: true,
      });
      await newUser.save();

      return res.status(201).json({
        message: "Account created successfully",
        user: newUser,
      });
    }

    if (userType === "doctor" || userType === "investor") {
      return res.status(403).json({
        message: "Your email is not registered. Please contact the admin to create your account.",
      });
    }
    if (userType === "admin") {
      const adminExists = await User.exists({ userType: "admin" });
      if (adminExists) {
        return res.status(403).json({
          message: "more than 1 admin not allowed. Admin accounts must be created by the system administrator.",
        });
      }
      const newAdmin = new User({
        uid,
        email,
        userType,
        name,
        isActive: true,
        allowLogin: true,
      });
      await newAdmin.save();

      return res.status(201).json({
        message: "First admin created successfully",
        user: newAdmin,
      });
    }
    return res.status(403).json({
      message: "Admin accounts must be created by the system administrator.",
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserRole = async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      userType: user.userType,
      name: user.name,
    });
  } catch (err) {
    console.error("Error fetching user role:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export const verifyCredentials = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({
        message: "Email, password, and userType are required",
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered. Please contact admin.",
      });
    }

    // Check if it's doctor/investor
    if (userType !== "patient" && userType !== "admin") {
      // Check allowLogin
      if (!user.allowLogin) {
        return res.status(403).json({
          success: false,
          message: "Account not approved. Please contact admin.",
        });
      }

      // Check userType matches
      if (user.userType !== userType) {
        return res.status(403).json({
          success: false,
          message: `You are registered as a ${user.userType}. Please use the ${user.userType} login.`,
        });
      }
    }

    // Check if password exists in DB
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Please use Google or Apple login for your account.",
      });
    }

    // ✅ Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Password is valid
    return res.status(200).json({
      success: true,
      message: "Credentials verified",
      user: {
        email: user.email,
        name: user.name,
        userType: user.userType,
        uid: user.uid,
      },
    });

  } catch (error) {
    console.error("Error verifying credentials:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

export const checkEmail = async (req, res) => {
  try {
    const { email, userType } = req.body;

    if (!email || !userType) {
      return res.status(400).json({
        message: "Email and userType are required",
      });
    }

    const user = await User.findOne({ email });

    // Patient: Always allow
    if (userType === "patient") {
      return res.status(200).json({
        exists: !!user,
        allowed: true,
      });
    }

    // Doctor/Investor: Check if exists and allowLogin is true
    if (!user) {
      return res.status(200).json({
        exists: false,
        allowed: false,
        message: "Email not registered. Please contact admin.",
      });
    }

    if (!user.allowLogin) {
      return res.status(200).json({
        exists: true,
        allowed: false,
        message: "Account not approved. Please contact admin.",
      });
    }

    if (user.userType !== userType) {
      return res.status(200).json({
        exists: true,
        allowed: false,
        message: `You are registered as a ${user.userType}. Please use the ${user.userType} login.`,
      });
    }

    return res.status(200).json({
      exists: true,
      allowed: true,
    });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export const setActive = async (req, res) => {
  try {
    const { uid, isActive } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "UID is required" });
    }

    const user = await User.findOneAndUpdate(
      { uid },
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User status updated",
      user,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error" });
  }
}
export const getUserByUid = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json("server error")
  }
}
export const getUserProfileData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "no user found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json("server error")
  }
}