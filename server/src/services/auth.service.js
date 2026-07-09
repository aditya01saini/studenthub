import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import jwt from "jsonwebtoken";


export const registerUser = async (userData) => {
  const { fullName, email, password, role, companyName } = userData;

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
    });
  }

  if (role === "recruiter") {
    await RecruiterProfile.create({
      user: user._id,
      companyName,
    });
  }

  const userResponse = user.toObject();

  delete userResponse.password;
  return {
    success: true,
    message: "Account created successfully",
    user: userResponse
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

  // Compare Password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT Token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
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