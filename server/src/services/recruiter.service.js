import RecruiterProfile from "../models/RecruiterProfile.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";

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

export const getRecruiterDashboard = async (userId) => {
  // Find recruiter profile
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  }).populate(
    "user",
    "fullName email isVerified"
  );

  if (!recruiter) {
    const error = new Error("Recruiter profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Fetch dashboard data in parallel
  const [
    totalInternships,
    activeInternships,
    closedInternships,
    totalApplications,
    pendingApplications,
    shortlistedApplications,
    acceptedApplications,
    rejectedApplications,
    withdrawnApplications,
    recentInternships,
    recentApplications,
  ] = await Promise.all([
    // Total Internships
    Internship.countDocuments({
      recruiter: recruiter._id,
    }),

    // Active/Open Internships
    Internship.countDocuments({
      recruiter: recruiter._id,
      status: "Open",
      isActive: true,
    }),

    // Closed Internships
    Internship.countDocuments({
      recruiter: recruiter._id,
      status: "Closed",
    }),

    // Total Applications
    Application.countDocuments({
      recruiter: recruiter._id,
    }),

    // Pending Applications
    Application.countDocuments({
      recruiter: recruiter._id,
      status: "Pending",
    }),

    // Shortlisted Applications
    Application.countDocuments({
      recruiter: recruiter._id,
      status: "Shortlisted",
    }),

    // Accepted Applications
    Application.countDocuments({
      recruiter: recruiter._id,
      status: "Accepted",
    }),

    // Rejected Applications
    Application.countDocuments({
      recruiter: recruiter._id,
      status: "Rejected",
    }),

    // Withdrawn Applications
    Application.countDocuments({
      recruiter: recruiter._id,
      status: "Withdrawn",
    }),

    // Recent 5 Internships
    Internship.find({
      recruiter: recruiter._id,
    })
      .select(
        "title category workMode location stipend status applicantsCount viewsCount isActive createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5),

    // Recent 5 Applications
    Application.find({
      recruiter: recruiter._id,
    })
      .select(
        "student internship status appliedAt"
      )
      .populate({
        path: "student",
        select:
          "college course profileImage skills",
        populate: {
          path: "user",
          select: "fullName email",
        },
      })
      .populate({
        path: "internship",
        select: "title",
      })
      .sort({
        appliedAt: -1,
      })
      .limit(5),
  ]);

  return {
    success: true,

    dashboard: {
      profile: {
        recruiterId: recruiter.user._id,
        fullName: recruiter.user.fullName,
        email: recruiter.user.email,
        isVerified: recruiter.user.isVerified,
        companyName: recruiter.companyName,
        companyLogo: recruiter.companyLogo,
        industry: recruiter.industry,
        location: recruiter.location,
      },

      stats: {
        totalInternships,
        activeInternships,
        closedInternships,
        totalApplications,
        pending: pendingApplications,
        shortlisted: shortlistedApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
        withdrawn: withdrawnApplications,
      },

      recentInternships,

      recentApplications,
    },
  };
};