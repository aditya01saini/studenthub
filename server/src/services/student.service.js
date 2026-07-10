import StudentProfile from "../models/StudentProfile.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { uploadToCloudinary } from "./upload.service.js";

export const getProfile = async (userId) => {
  const profile = await StudentProfile.findOne({
    user: userId,
  }).populate("user", "fullName email role isVerified");

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    profile,
  };
};

export const updateProfile = async (userId, profileData) => {
  const { college, course, bio, skills, github, linkedin, portfolio } =
    profileData;

  const profile = await StudentProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  profile.college = college || profile.college;
  profile.course = course || profile.course;
  profile.bio = bio || profile.bio;
  profile.github = github || profile.github;
  profile.linkedin = linkedin || profile.linkedin;
  profile.portfolio = portfolio || profile.portfolio;

  if (skills) {
    profile.skills = skills;
  }

  await profile.save();

  return {
    success: true,
    message: "Profile updated successfully",
    profile,
  };
};

export const updateProfileImage = async (userId, file) => {
  const profile = await StudentProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  const imageUrl = await uploadToCloudinary(
    file.path,
    "studenthub/profile-images",
    "image"
  );

  profile.profileImage = imageUrl;

  await profile.save();

  return {
    success: true,
    message: "Profile image uploaded successfully",
    profile,
  };
};


export const updateResume = async (userId, file) => {
  const profile = await StudentProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  const resumeUrl = await uploadToCloudinary(
    file.path,
    "studenthub/resumes",
    "raw"
  );

  profile.resume = resumeUrl;

  await profile.save();

  return {
    success: true,
    message: "Resume uploaded successfully",
    profile,
  };
};

export const deleteResume = async (userId) => {
  const profile = await StudentProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  if (!profile.resume) {
    const error = new Error("Resume not found");
    error.statusCode = 404;
    throw error;
  }

  profile.resume = "";

  await profile.save();

  return {
    success: true,
    message: "Resume deleted successfully",
    profile,
  };
};

export const deleteProfileImage = async (userId) => {
  const profile = await StudentProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  if (!profile.profileImage) {
    const error = new Error("Profile image not found");
    error.statusCode = 404;
    throw error;
  }

  profile.profileImage = "";

  await profile.save();

  return {
    success: true,
    message: "Profile image deleted successfully",
    profile,
  };
};

export const getPublicProfile = async (studentId) => {
  const profile = await StudentProfile.findOne({
    user: studentId,
  }).populate(
    "user",
    "fullName role isVerified"
  );

  if (!profile) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    profile,
  };
};