import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  getRecruiterProfile,
  updateRecruiterProfile,
  uploadRecruiterCompanyLogo,
  deleteRecruiterCompanyLogo,
  getPublicRecruiterProfile,
} from "../controllers/recruiter.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/profile", protect, authorize("recruiter"), getRecruiterProfile);
router.put("/profile", protect, authorize("recruiter"), updateRecruiterProfile);
router.put(
  "/logo",
  protect,
  authorize("recruiter"),
  upload.single("companyLogo"),
  uploadRecruiterCompanyLogo,
);

router.delete(
  "/logo",
  protect,
  authorize("recruiter"),
  deleteRecruiterCompanyLogo,
);

router.get("/:recruiterId", getPublicRecruiterProfile);

export default router;
