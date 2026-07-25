import express from "express";

import {
  followStudentController,
  unfollowStudentController,
  getStudentFollowersController,
  getStudentFollowingController,
  bookmarkResourceController,
  removeBookmarkController,
  getMyBookmarksController,
  getCommunityFeedController,
  getFollowStatusController,
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

// Get Logged-in Student Bookmarks
router.get(
  "/bookmarks",
  protect,
  authorize("student"),
  getMyBookmarksController,
);

// Bookmark Project / Note / Internship
router.post(
  "/bookmarks/:resourceType/:resourceId",
  protect,
  authorize("student"),
  bookmarkResourceController,
);

// Remove Bookmark
router.delete(
  "/bookmarks/:resourceType/:resourceId",
  protect,
  authorize("student"),
  removeBookmarkController,
);

// Community Feed
router.get("/feed", protect, authorize("student"), getCommunityFeedController);

// Check Follow Status
router.get(
  "/students/:studentId/follow-status",
  protect,
  authorize("student"),
  getFollowStatusController,
);
export default router;
