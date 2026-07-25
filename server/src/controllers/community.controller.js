import asyncHandler from "../utils/asyncHandler.js";

import {
  followStudent,
  unfollowStudent,
  getStudentFollowers,
  getStudentFollowing,
  bookmarkResource,
  removeBookmark,
  getMyBookmarks,
  getCommunityFeed,
  getFollowStatus
} from "../services/community.service.js";

// Follow Student
export const followStudentController = asyncHandler(
  async (req, res) => {
    const result = await followStudent(
      req.user._id,
      req.params.studentId,
    );

    return res.status(201).json(result);
  },
);

// Unfollow Student
export const unfollowStudentController = asyncHandler(
  async (req, res) => {
    const result = await unfollowStudent(
      req.user._id,
      req.params.studentId,
    );

    return res.status(200).json(result);
  },
);

// Get Student Followers
export const getStudentFollowersController = asyncHandler(
  async (req, res) => {
    const result = await getStudentFollowers(
      req.params.studentId,
    );

    return res.status(200).json(result);
  },
);

// Get Student Following
export const getStudentFollowingController = asyncHandler(
  async (req, res) => {
    const result = await getStudentFollowing(
      req.params.studentId,
    );

    return res.status(200).json(result);
  },
);

// Bookmark Resource
export const bookmarkResourceController = asyncHandler(
  async (req, res) => {
    const result = await bookmarkResource(
      req.user._id,
      req.params.resourceType,
      req.params.resourceId,
    );

    return res.status(201).json(result);
  },
);

// Remove Bookmark
export const removeBookmarkController = asyncHandler(
  async (req, res) => {
    const result = await removeBookmark(
      req.user._id,
      req.params.resourceType,
      req.params.resourceId,
    );

    return res.status(200).json(result);
  },
);

// Get My Bookmarks
export const getMyBookmarksController = asyncHandler(
  async (req, res) => {
    const result = await getMyBookmarks(
      req.user._id,
      req.query.type,
    );

    return res.status(200).json(result);
  },
);

// Get Community Feed
export const getCommunityFeedController = asyncHandler(
  async (req, res) => {
    const { page, limit } = req.query;

    const result = await getCommunityFeed(
      req.user._id,
      page,
      limit,
    );

    return res.status(200).json(result);
  },
);

// Check Follow Status
export const getFollowStatusController = asyncHandler(
  async (req, res) => {
    const result = await getFollowStatus(
      req.user._id,
      req.params.studentId,
    );

    return res.status(200).json(result);
  },
);