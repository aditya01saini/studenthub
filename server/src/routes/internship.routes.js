import express from "express";
import {
  createRecruiterInternship,
  getMyInternships,
  updateRecruiterInternship,
  deleteRecruiterInternship,
  getInternship,
  getInternships,
} from "../controllers/internship.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", getInternships);

router.post("/", protect, authorize("recruiter"), createRecruiterInternship);
router.get(
  "/my-internships",
  protect,
  authorize("recruiter"),
  getMyInternships,
);

router.put("/:id", protect, authorize("recruiter"), updateRecruiterInternship);

router.delete(
  "/:id",
  protect,
  authorize("recruiter"),
  deleteRecruiterInternship,
);

router.get("/:id", getInternship);

export default router;
