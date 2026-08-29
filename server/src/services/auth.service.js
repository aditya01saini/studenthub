import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// ==========================================
// EMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ==========================================
// REGISTER USER
// ==========================================

export const registerUser = async (userData) => {
  const { fullName, email, password, role, companyName, college, website } =
    userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role,
  });

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

// ==========================================
// LOGIN USER
// ==========================================

export const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error(
      "Your account has been deactivated. Please contact support.",
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  user.lastLoginAt = new Date();

  await user.save();

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
// FORGOT PASSWORD
// ==========================================

export const forgotUserPassword = async (email) => {
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
    role: { $in: ["student", "recruiter"] },
  });

  // Security ke liye user exist karta hai ya nahi,
  // same response return karenge.
  if (!user) {
    return {
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    };
  }

  // Secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Token ka hashed version database mein save karenge
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;

  // Token 15 minutes ke liye valid
  user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  // Frontend reset URL
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  // Email
  await transporter.sendMail({
    from: `"StudentHub" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "StudentHub - Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">
        
        <h2 style="color: #4f46e5;">
          StudentHub Password Reset
        </h2>

        <p>Hello ${user.fullName},</p>

        <p>
          We received a request to reset your StudentHub account password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <div style="margin: 30px 0;">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background: #4f46e5;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>
        </div>

        <p>
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="color: #777; font-size: 13px;">
          StudentHub Team
        </p>

      </div>
    `,
  });

  return {
    success: true,
    message:
      "If an account exists with this email, a password reset link has been sent.",
  };
};

// ==========================================
// RESET PASSWORD
// ==========================================

export const resetUserPassword = async (token, newPassword) => {
  if (!token) {
    const error = new Error("Reset token is required");
    error.statusCode = 400;
    throw error;
  }

  if (!newPassword) {
    const error = new Error("New password is required");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error("New password must be at least 6 characters");

    error.statusCode = 400;
    throw error;
  }

  // Incoming token ko hash karo
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Valid student/recruiter token find karo
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: new Date(),
    },
    role: {
      $in: ["student", "recruiter"],
    },
  });

  if (!user) {
    const error = new Error("Password reset token is invalid or has expired");

    error.statusCode = 400;
    throw error;
  }

  // New password set
  user.password = newPassword;

  // Token invalidate
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return {
    success: true,
    message:
      "Password reset successfully. You can now login with your new password.",
  };
};

// ==========================================
// UPDATE USER PROFILE
// ==========================================

export const updateUserProfile = async (userId, userData) => {
  const { fullName, email } = userData;

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (fullName !== undefined) {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      const error = new Error("Full name cannot be empty");

      error.statusCode = 400;
      throw error;
    }

    user.fullName = trimmedName;
  }

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      const error = new Error("Email cannot be empty");

      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: userId },
    });

    if (existingUser) {
      const error = new Error("Email already exists");

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
// CHANGE PASSWORD
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
    const error = new Error("Current password and new password are required");

    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error("New password must be at least 6 characters");

    error.statusCode = 400;
    throw error;
  }

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    const error = new Error("Current password is incorrect");

    error.statusCode = 400;
    throw error;
  }

  if (currentPassword === newPassword) {
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
