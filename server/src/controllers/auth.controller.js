import asyncHandler from "../utils/asyncHandler.js";

import {
  registerUser,
  loginUser,
  updateUserProfile,
  changeUserPassword,
  forgotUserPassword,
  resetUserPassword,
} from "../services/auth.service.js";

// ==========================================
// REGISTER
// ==========================================

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return res.status(201).json(result);
});

// ==========================================
// LOGIN
// ==========================================

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  return res.status(200).json(result);
});

// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await forgotUserPassword(email);

  return res.status(200).json(result);
});

// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const result = await resetUserPassword(token, password);

  return res.status(200).json(result);
});

// ==========================================
// GET CURRENT USER
// ==========================================

export const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateProfile = asyncHandler(async (req, res) => {
  const result = await updateUserProfile(req.user._id, req.body);

  return res.status(200).json(result);
});

// ==========================================
// CHANGE PASSWORD
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
