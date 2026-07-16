import asyncHandler from "../utils/asyncHandler.js";
import {
  uploadProject,
  getMyProjects,
  getAllProjects,
  getSingleProject,
  updateProject,
  updateProjectImages,
  deleteProject,
  searchProjects,
} from "../services/project.service.js";

export const uploadStudentProject = asyncHandler(async (req, res) => {
  const projectData = {
    ...req.body,

    techStack: req.body.techStack
      ? req.body.techStack.split(",").map((tech) => tech.trim())
      : [],
  };

  const result = await uploadProject(req.user._id, projectData, req.files);

  return res.status(201).json(result);
});

export const getStudentProjects = asyncHandler(async (req, res) => {
  const result = await getMyProjects(req.user._id);

  return res.status(200).json(result);
});

export const getAllStudentProjects = asyncHandler(async (req, res) => {
  const result = await getAllProjects(req.query.page, req.query.limit);
  return res.status(200).json(result);
});

export const getStudentProject = asyncHandler(async (req, res) => {
  const result = await getSingleProject(req.params.projectId);

  return res.status(200).json(result);
});

export const updateStudentProject = asyncHandler(async (req, res) => {
  const projectData = {
    ...req.body,

    techStack: req.body.techStack
      ? req.body.techStack.split(",").map((tech) => tech.trim())
      : undefined,
  };

  const result = await updateProject(
    req.user._id,
    req.params.projectId,
    projectData,
  );

  return res.status(200).json(result);
});

export const updateStudentProjectImages = asyncHandler(async (req, res) => {
  const result = await updateProjectImages(
    req.user._id,
    req.params.projectId,
    req.files,
  );

  return res.status(200).json(result);
});

export const deleteStudentProject = asyncHandler(async (req, res) => {
  const result = await deleteProject(req.user._id, req.params.projectId);

  return res.status(200).json(result);
});

export const searchStudentProjects =
  asyncHandler(async (req, res) => {

    const result =
  await searchProjects({
    search: req.query.search,
    category: req.query.category,
    techStack: req.query.techStack,
    sort: req.query.sort,
    page: req.query.page,
    limit: req.query.limit,
  });

    return res.status(200).json(result);

  });