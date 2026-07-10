import asyncHandler from "../utils/asyncHandler.js";
import {
  getProfile,
  updateProfile,
  updateProfileImage,
  updateResume,
  deleteResume,
  deleteProfileImage,
  getPublicProfile
} from "../services/student.service.js";

export const getStudentProfile = asyncHandler(async (req, res) => {
  const result = await getProfile(req.user._id);

  return res.status(200).json(result);
});

export const updateStudentProfile = asyncHandler(async (req, res) => {
  const result = await updateProfile(req.user._id, req.body);

  return res.status(200).json(result);
});

export const uploadStudentProfileImage = asyncHandler(async (req, res) => {
  const result = await updateProfileImage(req.user._id, req.file);

  return res.status(200).json(result);
});

export const uploadStudentResume = asyncHandler(async (req, res) => {
  const result = await updateResume(req.user._id, req.file);

  return res.status(200).json(result);
});

export const deleteStudentResume = asyncHandler(async (req, res) => {
  const result = await deleteResume(req.user._id);

  return res.status(200).json(result);
});

export const deleteStudentProfileImage = asyncHandler(async (req, res) => {
  const result = await deleteProfileImage(req.user._id);

  return res.status(200).json(result);
});

export const getPublicStudentProfile = asyncHandler(async (req, res) => {
  const result = await getPublicProfile(req.params.studentId);

  return res.status(200).json(result);
});
