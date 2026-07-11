import asyncHandler from "../utils/asyncHandler.js";
import {
  getProfile,
  updateProfile,
  updateCompanyLogo,
  deleteCompanyLogo,
  getPublicProfile
} from "../services/recruiter.service.js";

export const getRecruiterProfile = asyncHandler(async (req, res) => {
  const result = await getProfile(req.user._id);

  return res.status(200).json(result);
});

export const updateRecruiterProfile = asyncHandler(async (req, res) => {
  const result = await updateProfile(req.user._id, req.body);

  return res.status(200).json(result);
});

export const uploadRecruiterCompanyLogo = asyncHandler(async (req, res) => {
  const result = await updateCompanyLogo(req.user._id, req.file);

  return res.status(200).json(result);
});

export const deleteRecruiterCompanyLogo = asyncHandler(async (req, res) => {
  const result = await deleteCompanyLogo(req.user._id);

  return res.status(200).json(result);
});

export const getPublicRecruiterProfile = asyncHandler(async (req, res) => {
  const result = await getPublicProfile(req.params.recruiterId);

  return res.status(200).json(result);
});