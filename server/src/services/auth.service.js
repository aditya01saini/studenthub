import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
  const { fullName, email, password, role, companyName, college, website } =
    userData;
  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Create User
  const user = await User.create({
    fullName,
    email,
    password,
    role,
  });

  // Create Profile
  if (role === "student") {
    await StudentProfile.create({
      user: user._id,
      college,
    });
  }

  if (role === "recruiter") {
    await RecruiterProfile.create({
      user: user._id,
      companyName,
      website,
    });
  }
  const userResponse = user.toObject();

  delete userResponse.password;
  return {
    success: true,
    message: "Account created successfully",
    user: userResponse,
  };
};

// Login User
export const loginUser = async (userData) => {
  const { email, password } = userData;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check account status
  if (!user.isActive) {
    throw new Error(
      "Your account has been deactivated. Please contact support.",
    );
  }

  // Compare Password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Update Last Login
  user.lastLoginAt = new Date();

  await user.save();

  // Generate JWT Token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Remove Password
  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    success: true,
    message: "Login successful",
    token,
    user: userResponse,
  };
};

// ==========================================
// Update User Profile
// ==========================================

export const updateUserProfile = async (
  userId,
  userData,
) => {
  const { fullName, email } = userData;

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Update Full Name
  if (fullName !== undefined) {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      const error = new Error(
        "Full name cannot be empty",
      );

      error.statusCode = 400;
      throw error;
    }

    user.fullName = trimmedName;
  }

  // Update Email
  if (email !== undefined) {
    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      const error = new Error(
        "Email cannot be empty",
      );

      error.statusCode = 400;
      throw error;
    }

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
        _id: { $ne: userId },
      });

    if (existingUser) {
      const error = new Error(
        "Email already exists",
      );

      error.statusCode = 409;
      throw error;
    }

    user.email = normalizedEmail;
  }

  await user.save();

  const userResponse = user.toObject();

  delete userResponse.password;

  return {
    success: true,
    message: "Profile updated successfully",
    user: userResponse,
  };
};


// ==========================================
// Change Password
// ==========================================

export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!currentPassword || !newPassword) {
    const error = new Error(
      "Current password and new password are required",
    );

    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error(
      "New password must be at least 6 characters",
    );

    error.statusCode = 400;
    throw error;
  }

  const isMatch =
    await user.comparePassword(
      currentPassword,
    );

  if (!isMatch) {
    const error = new Error(
      "Current password is incorrect",
    );

    error.statusCode = 400;
    throw error;
  }

  if (
    currentPassword === newPassword
  ) {
    const error = new Error(
      "New password must be different from current password",
    );

    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword;

  await user.save();

  return {
    success: true,
    message: "Password changed successfully",
  };
};