import Follow from "../models/Follow.js";
import StudentProfile from "../models/StudentProfile.js";
import { createNotification } from "./notification.service.js";
import Bookmark from "../models/Bookmark.js";
import Project from "../models/Project.js";
import Note from "../models/Note.js";
import Internship from "../models/Internship.js";

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

// Bookmark Resource
export const bookmarkResource = async (userId, resourceType, resourceId) => {
  // Logged-in Student
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Allowed resource types
  const resourceModels = {
    Project,
    Note,
    Internship,
  };

  const Model = resourceModels[resourceType];

  if (!Model) {
    const error = new Error("Invalid resource type");
    error.statusCode = 400;
    throw error;
  }

  // Check resource exists
  const resource = await Model.findById(resourceId);

  if (!resource || resource.isActive === false) {
    const error = new Error(`${resourceType} not found`);
    error.statusCode = 404;
    throw error;
  }

  // Check already bookmarked
  const existingBookmark = await Bookmark.findOne({
    student: student._id,
    resourceType,
    resourceId,
  });

  if (existingBookmark) {
    const error = new Error(`${resourceType} is already bookmarked`);
    error.statusCode = 400;
    throw error;
  }

  // Create bookmark
  const bookmark = await Bookmark.create({
    student: student._id,
    resourceType,
    resourceId,
  });

  // Increase bookmark count
  await Model.updateOne(
    {
      _id: resourceId,
    },
    {
      $inc: {
        bookmarksCount: 1,
      },
    },
  );

  return {
    success: true,
    message: `${resourceType} bookmarked successfully`,
    bookmark,
  };
};

// Remove Bookmark
export const removeBookmark = async (userId, resourceType, resourceId) => {
  // Logged-in Student
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Allowed Resource Types
  const resourceModels = {
    Project,
    Note,
    Internship,
  };

  const Model = resourceModels[resourceType];

  if (!Model) {
    const error = new Error("Invalid resource type");
    error.statusCode = 400;
    throw error;
  }

  // Find Existing Bookmark
  const bookmark = await Bookmark.findOne({
    student: student._id,
    resourceType,
    resourceId,
  });

  if (!bookmark) {
    const error = new Error(`${resourceType} is not bookmarked`);
    error.statusCode = 404;
    throw error;
  }

  // Delete Bookmark
  await bookmark.deleteOne();

  // Safely decrease bookmark count
  await Model.updateOne(
    {
      _id: resourceId,
      bookmarksCount: { $gt: 0 },
    },
    {
      $inc: {
        bookmarksCount: -1,
      },
    },
  );

  return {
    success: true,
    message: `${resourceType} bookmark removed successfully`,
  };
};

// Get Logged-in Student Bookmarks
export const getMyBookmarks = async (userId, resourceType = null) => {
  // Logged-in Student
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Build Filter
  const filter = {
    student: student._id,
  };

  // Optional resource type filter
  if (resourceType) {
    const allowedTypes = ["Project", "Note", "Internship"];

    if (!allowedTypes.includes(resourceType)) {
      const error = new Error("Invalid resource type");
      error.statusCode = 400;
      throw error;
    }

    filter.resourceType = resourceType;
  }

  // Get Bookmarks
  const bookmarks = await Bookmark.find(filter).populate("resourceId").sort({
    createdAt: -1,
  });

  return {
    success: true,
    count: bookmarks.length,
    bookmarks,
  };
};

// Get Community Feed
export const getCommunityFeed = async (userId, page = 1, limit = 10) => {
  // Logged-in Student
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Pagination
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const skip = (page - 1) * limit;

  // Get students that current student follows
  const followings = await Follow.find({
    follower: student._id,
  }).select("following");

  const followingIds = followings.map((follow) => follow.following);

  // If student follows nobody
  if (followingIds.length === 0) {
    return {
      success: true,
      currentPage: page,
      totalPages: 0,
      totalProjects: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      projects: [],
    };
  }

  const filter = {
    uploadedBy: {
      $in: followingIds,
    },
    isActive: true,
  };

  const [projects, totalProjects] = await Promise.all([
    Project.find(filter)
      .populate({
        path: "uploadedBy",
        select: "user college course profileImage",
        populate: {
          path: "user",
          select: "fullName isVerified",
        },
      })
      .select(
        "title description category techStack githubUrl liveDemoUrl thumbnail viewsCount bookmarksCount createdAt uploadedBy",
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Project.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProjects / limit);

  return {
    success: true,

    currentPage: page,
    totalPages,
    totalProjects,

    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,

    projects,
  };
};
export const getFollowStatus = async (userId, targetStudentId) => {
  const currentStudent = await StudentProfile.findOne({
    user: userId,
  });

  if (!currentStudent) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  const targetStudent = await StudentProfile.findOne({
    user: targetStudentId,
  });

  if (!targetStudent) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const follow = await Follow.exists({
    follower: currentStudent._id,
    following: targetStudent._id,
  });

  return {
    success: true,
    isFollowing: Boolean(follow),
  };
};
