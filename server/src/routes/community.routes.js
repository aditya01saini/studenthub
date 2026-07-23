import express from "express";

import {
  followStudentController,
  unfollowStudentController,
  getStudentFollowersController,
  getStudentFollowingController,
} from "../controllers/community.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

// Follow Student
router.post(
  "/students/:studentId/follow",
  protect,
  authorize("student"),
  followStudentController,
);

// Unfollow Student
router.delete(
  "/students/:studentId/follow",
  protect,
  authorize("student"),
  unfollowStudentController,
);

// Get Student Followers
router.get("/students/:studentId/followers", getStudentFollowersController);

// Get Student Following
router.get("/students/:studentId/following", getStudentFollowingController);

export default router;
