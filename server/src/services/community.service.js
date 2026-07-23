import Follow from "../models/Follow.js";
import StudentProfile from "../models/StudentProfile.js";
import { createNotification } from "./notification.service.js";

// Follow Student
export const followStudent = async (userId, targetStudentId) => {
  // Logged-in Student Profile
  const follower = await StudentProfile.findOne({
    user: userId,
  });

  if (!follower) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Student to Follow
  // targetStudentId is User ID from public student profile
  const following = await StudentProfile.findOne({
    user: targetStudentId,
  });

  if (!following) {
    const error = new Error("Student you are trying to follow was not found");
    error.statusCode = 404;
    throw error;
  }

  // Prevent Following Yourself
  if (follower._id.toString() === following._id.toString()) {
    const error = new Error("You cannot follow yourself");
    error.statusCode = 400;
    throw error;
  }

  // Check Already Following
  const existingFollow = await Follow.findOne({
    follower: follower._id,
    following: following._id,
  });

  if (existingFollow) {
    const error = new Error("You are already following this student");
    error.statusCode = 400;
    throw error;
  }

  // Create Follow
  const follow = await Follow.create({
    follower: follower._id,
    following: following._id,
  });

  // Update Counts
  await Promise.all([
    StudentProfile.updateOne(
      {
        _id: follower._id,
      },
      {
        $inc: {
          followingCount: 1,
        },
      },
    ),

    StudentProfile.updateOne(
      {
        _id: following._id,
      },
      {
        $inc: {
          followersCount: 1,
        },
      },
    ),
  ]);

  // Create Notification
  await createNotification({
    recipient: following.user,
    sender: follower.user,
    type: "NEW_FOLLOWER",
    title: "New Follower",
    message: "A student started following you.",
  });

  return {
    success: true,
    message: "Student followed successfully",
    follow,
  };
};

// Unfollow Student
export const unfollowStudent = async (userId, targetStudentId) => {
  // Logged-in Student Profile
  const follower = await StudentProfile.findOne({
    user: userId,
  });

  if (!follower) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Student to Unfollow
  const following = await StudentProfile.findOne({
    user: targetStudentId,
  });

  if (!following) {
    const error = new Error("Student you are trying to unfollow was not found");
    error.statusCode = 404;
    throw error;
  }

  // Prevent Self Unfollow
  if (follower._id.toString() === following._id.toString()) {
    const error = new Error("You cannot unfollow yourself");
    error.statusCode = 400;
    throw error;
  }

  // Find Existing Follow
  const existingFollow = await Follow.findOne({
    follower: follower._id,
    following: following._id,
  });

  if (!existingFollow) {
    const error = new Error("You are not following this student");
    error.statusCode = 400;
    throw error;
  }

  // Delete Follow Record
  await existingFollow.deleteOne();

  // Safely Decrease Counts
  await Promise.all([
    StudentProfile.updateOne(
      {
        _id: follower._id,
        followingCount: { $gt: 0 },
      },
      {
        $inc: {
          followingCount: -1,
        },
      },
    ),

    StudentProfile.updateOne(
      {
        _id: following._id,
        followersCount: { $gt: 0 },
      },
      {
        $inc: {
          followersCount: -1,
        },
      },
    ),
  ]);

  return {
    success: true,
    message: "Student unfollowed successfully",
  };
};

// Get Student Followers
export const getStudentFollowers = async (targetStudentId) => {
  const student = await StudentProfile.findOne({
    user: targetStudentId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  const followers = await Follow.find({
    following: student._id,
  })
    .populate({
      path: "follower",
      select: "user college course profileImage skills",
      populate: {
        path: "user",
        select: "fullName isVerified",
      },
    })
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    count: followers.length,
    followers,
  };
};

// Get Student Following
export const getStudentFollowing = async (targetStudentId) => {
  const student = await StudentProfile.findOne({
    user: targetStudentId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  const following = await Follow.find({
    follower: student._id,
  })
    .populate({
      path: "following",
      select: "user college course profileImage skills",
      populate: {
        path: "user",
        select: "fullName isVerified",
      },
    })
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    count: following.length,
    following,
  };
};
