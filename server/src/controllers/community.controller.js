import asyncHandler from "../utils/asyncHandler.js";

import {
  followStudent,
  unfollowStudent,
  getStudentFollowers,
  getStudentFollowing,
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