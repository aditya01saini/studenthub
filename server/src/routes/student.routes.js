import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  uploadStudentProfileImage,
  uploadStudentResume,
  deleteStudentResume,
  deleteStudentProfileImage,
  getPublicStudentProfile,
} from "../controllers/student.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import upload, { uploadResume } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/profile", protect, authorize("student"), getStudentProfile);

router.put("/profile", protect, authorize("student"), updateStudentProfile);

router.put(
  "/profile/image",
  protect,
  authorize("student"),
  upload.single("profileImage"),
  uploadStudentProfileImage,
);

router.put(
  "/profile/resume",
  protect,
  authorize("student"),
  uploadResume.single("resume"),
  uploadStudentResume,
);

router.delete(
  "/profile/resume",
  protect,
  authorize("student"),
  deleteStudentResume,
);

router.delete(
  "/profile/image",
  protect,
  authorize("student"),
  deleteStudentProfileImage,
);

router.get(
  "/:studentId",
  getPublicStudentProfile
);


export default router;
