import asyncHandler from "../utils/asyncHandler.js";
import {
  createInternship,
  getRecruiterInternships,
  updateInternship,
  deleteInternship,
  getSingleInternship,
  getAllInternships
} from "../services/internship.service.js";

export const createRecruiterInternship = asyncHandler(async (req, res) => {
  const result = await createInternship(req.user._id, req.body);

  return res.status(201).json(result);
});

export const getMyInternships = asyncHandler(async (req, res) => {
  const result = await getRecruiterInternships(req.user._id);

  return res.status(200).json(result);
});

export const updateRecruiterInternship = asyncHandler(async (req, res) => {
  const result = await updateInternship(req.user._id, req.params.id, req.body);

  return res.status(200).json(result);
});

export const deleteRecruiterInternship =
  asyncHandler(async (req, res) => {
    const result = await deleteInternship(
      req.user._id,
      req.params.id
    );

    return res.status(200).json(result);
  });

  export const getInternship = asyncHandler(async (req, res) => {
  const result = await getSingleInternship(req.params.id);

  return res.status(200).json(result);
});

export const getInternships = asyncHandler(async (req, res) => {
  const result = await getAllInternships(req.query);

  return res.status(200).json(result);
});