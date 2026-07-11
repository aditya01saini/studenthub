import RecruiterProfile from "../models/RecruiterProfile.js";
import { uploadToCloudinary } from "./upload.service.js";


export const getProfile = async (userId) => {
  const profile = await RecruiterProfile.findOne({
    user: userId,
  }).populate(
    "user",
    "fullName email role isVerified"
  );

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
  const {
    companyName,
    website,
    industry,
    companySize,
    location,
    description,
  } = profileData;

  const profile = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  profile.companyName = companyName || profile.companyName;
  profile.website = website || profile.website;
  profile.industry = industry || profile.industry;
  profile.companySize = companySize || profile.companySize;
  profile.location = location || profile.location;
  profile.description = description || profile.description;

  await profile.save();

  return {
    success: true,
    message: "Recruiter profile updated successfully",
    profile,
  };
};

export const updateCompanyLogo = async (userId, file) => {
  const profile = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  const logoUrl = await uploadToCloudinary(
    file.path,
    "studenthub/company-logos",
    "image"
  );

  profile.companyLogo = logoUrl;

  await profile.save();

  return {
    success: true,
    message: "Company logo uploaded successfully",
    profile,
  };
};

export const deleteCompanyLogo = async (userId) => {
  const profile = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  if (!profile.companyLogo) {
    const error = new Error("Company logo not found");
    error.statusCode = 404;
    throw error;
  }

  profile.companyLogo = "";

  await profile.save();

  return {
    success: true,
    message: "Company logo deleted successfully",
    profile,
  };
};

export const getPublicProfile = async (recruiterId) => {
  const profile = await RecruiterProfile.findOne({
    user: recruiterId,
  }).populate(
    "user",
    "fullName role isVerified"
  );

  if (!profile) {
    const error = new Error("Recruiter not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    profile,
  };
};