import express from "express";

import {
  getDashboard,
  getUsers,
  getUserById,
  updateUserStatus,
  updateUserVerification,
  getRecruiters,
  updateRecruiterCompanyVerification,
  getInternships,
  updateInternshipActiveStatus,
  updateInternshipFeaturedStatus,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  sendNotification,
  getNotificationHistory,
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

const router = express.Router();

// Admin Dashboard

router.get("/dashboard", protect, adminOnly, getDashboard);

// User Management

router.get("/users", protect, adminOnly, getUsers);
// Get Single User

router.get("/users/:userId", protect, adminOnly, getUserById);

// Activate / Deactivate User

router.patch("/users/:userId/status", protect, adminOnly, updateUserStatus);

// Verify / Unverify User

router.patch(
  "/users/:userId/verification",
  protect,
  adminOnly,
  updateUserVerification,
);

//
// Recruiter Management

router.get("/recruiters", protect, adminOnly, getRecruiters);

// Verify / Unverify Recruiter Company

router.patch(
  "/recruiters/:recruiterProfileId/verification",
  protect,
  adminOnly,
  updateRecruiterCompanyVerification,
);

// Internship Management

router.get("/internships", protect, adminOnly, getInternships);

// Activate / Deactivate Internship

router.patch(
  "/internships/:internshipId/status",
  protect,
  adminOnly,
  updateInternshipActiveStatus,
);

// Feature / Unfeature Internship

router.patch(
  "/internships/:internshipId/featured",
  protect,
  adminOnly,
  updateInternshipFeaturedStatus,
);

// Application Management

router.get("/applications", protect, adminOnly, getApplications);
// Get Single Application

router.get(
  "/applications/:applicationId",
  protect,
  adminOnly,
  getApplicationById,
);

router.patch(
  "/applications/:applicationId/status",
  protect,
  adminOnly,
  updateApplicationStatus,
);
// Admin Notifications

router.post("/notifications", protect, adminOnly, sendNotification);

// Admin Notification History

router.get("/notifications", protect, adminOnly, getNotificationHistory);
export default router;
