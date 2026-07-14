import asyncHandler from "../utils/asyncHandler.js";
import { applyInternship, getMyApplications, withdrawApplication } from "../services/application.service.js";

export const applyForInternship = asyncHandler(async (req, res) => {
  const { coverLetter } = req.body;

  const result = await applyInternship(
    req.user._id,
    req.params.internshipId,
    coverLetter
  );

  return res.status(201).json(result);
});

export const getStudentApplications = asyncHandler(async (req, res) => {
  const result = await getMyApplications(req.user._id);

  return res.status(200).json(result);
});

export const withdrawStudentApplication = asyncHandler(
  async (req, res) => {
    const result = await withdrawApplication(
      req.user._id,
      req.params.id
    );

    return res.status(200).json(result);
  }
);