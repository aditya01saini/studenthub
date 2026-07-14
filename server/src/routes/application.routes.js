import express from "express";
import {
  applyForInternship,
  getStudentApplications,
  withdrawStudentApplication,
  getRecruiterApplicants,
  updateApplication

} from "../controllers/application.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

// Student Apply Internship
router.post(
  "/apply/:internshipId",
  protect,
  authorize("student"),
  applyForInternship,
);

router.get(
  "/my-applications",
  protect,
  authorize("student"),
  getStudentApplications,
);

router.patch(
  "/:id/withdraw",
  protect,
  authorize("student"),
  withdrawStudentApplication,
);

router.get(
  "/internship/:internshipId",
  protect,
  authorize("recruiter"),
  getRecruiterApplicants
);


router.patch(
  "/:applicationId/status",
  protect,
  authorize("recruiter"),
  updateApplication
);

export default router;
