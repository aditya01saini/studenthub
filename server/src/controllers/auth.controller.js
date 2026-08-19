import asyncHandler from "../utils/asyncHandler.js";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  changeUserPassword,
} from "../services/auth.service.js";
export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  return res.status(200).json(result);
});

export const forgotPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Forgot Password API Working",
  });
};

export const resetPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Reset Password API Working",
  });
};

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ==========================================
// Update Profile
// ==========================================

export const updateProfile = asyncHandler(async (req, res) => {
  const result = await updateUserProfile(req.user._id, req.body);

  return res.status(200).json(result);
});

// ==========================================
// Change Password
// ==========================================

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await changeUserPassword(
    req.user._id,
    currentPassword,
    newPassword,
  );

  return res.status(200).json(result);
});
