import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import upload from "../middlewares/upload.middleware.js";

import {
  uploadStudentProject,
  getStudentProjects,
  getAllStudentProjects,
  getStudentProject,
  updateStudentProject,
  updateStudentProjectImages,
  deleteStudentProject,
  searchStudentProjects,
} from "../controllers/project.controller.js";

const router = express.Router();

// Upload Project
router.post(
  "/",
  protect,
  authorize("student"),
  upload.array("images", 5),
  uploadStudentProject,
);

router.get("/", getAllStudentProjects);

router.get("/my-projects", protect, authorize("student"), getStudentProjects);
router.get("/search", searchStudentProjects);
router.get("/:projectId", getStudentProject);
router.put("/:projectId", protect, authorize("student"), updateStudentProject);
router.put(
  "/:projectId/images",
  protect,
  authorize("student"),
  upload.array("images", 5),
  updateStudentProjectImages,
);
router.delete(
  "/:projectId",
  protect,
  authorize("student"),
  deleteStudentProject,
);

export default router;
