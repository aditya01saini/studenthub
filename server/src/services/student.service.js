import StudentProfile from "../models/StudentProfile.js";
import Project from "../models/Project.js";
import Note from "../models/Note.js";
import Application from "../models/Application.js";
import Internship from "../models/Internship.js";

import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { calculateStudentScore } from "../utils/studentScore.js";

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
  const {
    college,
    course,
    graduationYear,
    bio,
    skills,
    github,
    linkedin,
    portfolio,
  } = profileData;

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
  profile.graduationYear = graduationYear || profile.graduationYear;
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
    "image",
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
    "raw",
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
  // Student Profile
  const profile = await StudentProfile.findOne({
    user: studentId,
  }).populate("user", "fullName role isVerified");

  if (!profile) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  // Projects
  const projects = await Project.find({
    uploadedBy: profile._id,
    isActive: true,
  });

  // Notes
  const notes = await Note.find({
    uploadedBy: profile._id,
    isActive: true,
  });

  // Statistics
  const projectViews = projects.reduce(
    (total, project) => total + project.viewsCount,
    0,
  );

  const noteDownloads = notes.reduce(
    (total, note) => total + note.downloadsCount,
    0,
  );

  // Overall Statistics
  const totalViews = projectViews + noteDownloads;

  const score = calculateStudentScore({
    projects: projects.length,
    notes: notes.length,
  });
  return {
    success: true,

    portfolio: {
      studentId: profile.user._id,

      fullName: profile.user.fullName,

      isVerified: profile.user.isVerified,

      profileImage: profile.profileImage,

      college: profile.college,

      course: profile.course,

      graduationYear: profile.graduationYear,

      bio: profile.bio,

      skills: profile.skills,

      github: profile.github,

      linkedin: profile.linkedin,

      portfolio: profile.portfolio,

      followersCount: profile.followersCount || 0,

      followingCount: profile.followingCount || 0,

      stats: {
        projects: projects.length,

        notes: notes.length,

        projectViews,

        noteDownloads,

        totalViews,

        score,
      },
    },
  };
};

export const getTopStudents = async () => {
  // Get all students
  const students = await StudentProfile.find().populate(
    "user",
    "fullName isVerified",
  );

  const leaderboard = [];

  for (const student of students) {
    const projects = await Project.countDocuments({
      uploadedBy: student._id,
      isActive: true,
    });

    const notes = await Note.countDocuments({
      uploadedBy: student._id,
      isActive: true,
    });

    // Skip inactive students
    if (projects === 0 && notes === 0) {
      continue;
    }

    const score = calculateStudentScore({
      projects,
      notes,
    });

    leaderboard.push({
      studentId: student.user._id,

      fullName: student.user.fullName,

      isVerified: student.user.isVerified,

      profileImage: student.profileImage,

      college: student.college,

      course: student.course,

      skills: student.skills.slice(0, 3),

      github: student.github,

      linkedin: student.linkedin,

      projects,

      notes,

      score,
    });
  }

  leaderboard.sort((a, b) => b.score - a.score);

  return {
    success: true,

    students: leaderboard.slice(0, 10),
  };
};

export const getStudentProjects = async (studentId, page = 1, limit = 6) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  // Student Profile
  const student = await StudentProfile.findOne({
    user: studentId,
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  // Total Projects
  const totalProjects = await Project.countDocuments({
    uploadedBy: student._id,
    isActive: true,
  });

  // Projects
  const projects = await Project.find({
    uploadedBy: student._id,
    isActive: true,
  })
    .select(
      "title description category techStack thumbnail githubUrl liveDemoUrl likesCount viewsCount featured createdAt",
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  return {
    success: true,

    currentPage: page,

    totalPages: Math.ceil(totalProjects / limit),

    totalProjects,

    hasNextPage: page < Math.ceil(totalProjects / limit),

    hasPreviousPage: page > 1,

    projects,
  };
};

export const getStudentNotes = async (studentId, page = 1, limit = 6) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  // Student Profile
  const student = await StudentProfile.findOne({
    user: studentId,
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  // Total Notes
  const totalNotes = await Note.countDocuments({
    uploadedBy: student._id,
    isActive: true,
  });

  // Notes
  const notes = await Note.find({
    uploadedBy: student._id,
    isActive: true,
  })
    .select(
      "title description subject branch semester university academicYear thumbnail downloadsCount viewsCount createdAt",
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  return {
    success: true,

    currentPage: page,

    totalPages: Math.ceil(totalNotes / limit),

    totalNotes,

    hasNextPage: page < Math.ceil(totalNotes / limit),

    hasPreviousPage: page > 1,

    notes,
  };
};

export const getStudentDashboard = async (userId) => {
  // Find student profile
  const student = await StudentProfile.findOne({
    user: userId,
  }).populate("user", "fullName email isVerified");

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Fetch dashboard data in parallel
  const [
    totalProjects,
    totalNotes,
    totalApplications,
    pendingApplications,
    shortlistedApplications,
    acceptedApplications,
    rejectedApplications,
    withdrawnApplications,
    recentProjects,
    recentNotes,
    recentApplications,
  ] = await Promise.all([
    Project.countDocuments({
      uploadedBy: student._id,
      isActive: true,
    }),

    Note.countDocuments({
      uploadedBy: student._id,
      isActive: true,
    }),

    Application.countDocuments({
      student: student._id,
    }),

    Application.countDocuments({
      student: student._id,
      status: "Pending",
    }),

    Application.countDocuments({
      student: student._id,
      status: "Shortlisted",
    }),

    Application.countDocuments({
      student: student._id,
      status: "Accepted",
    }),

    Application.countDocuments({
      student: student._id,
      status: "Rejected",
    }),
    Application.countDocuments({
      student: student._id,
      status: "Withdrawn",
    }),

    // Latest 3 Projects
    Project.find({
      uploadedBy: student._id,
      isActive: true,
    })
      .select("title thumbnail category viewsCount likesCount createdAt")
      .sort({ createdAt: -1 })
      .limit(3),

    // Latest 3 Notes
    Note.find({
      uploadedBy: student._id,
      isActive: true,
    })
      .select("title subject thumbnail viewsCount downloadsCount createdAt")
      .sort({ createdAt: -1 })
      .limit(3),

    // Latest 5 Applications
    Application.find({
      student: student._id,
    })
      .select("internship status appliedAt")
      .populate({
        path: "internship",
        select: "title workMode location stipend",
        populate: {
          path: "recruiter",
          select: "companyName companyLogo",
        },
      })
      .sort({ appliedAt: -1 })
      .limit(5),
  ]);

  // Student Score
  const score = calculateStudentScore({
    projects: totalProjects,
    notes: totalNotes,
  });

  // Calculate Profile Completion
  const profileFields = [
    student.profileImage,
    student.college,
    student.course,
    student.graduationYear,
    student.bio,
    student.skills?.length > 0,
    student.github,
    student.linkedin,
    student.portfolio,
    student.resume,
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  return {
    success: true,

    dashboard: {
      profile: {
        studentId: student.user._id,
        fullName: student.user.fullName,
        email: student.user.email,
        isVerified: student.user.isVerified,
        profileImage: student.profileImage,
        college: student.college,
        course: student.course,
        graduationYear: student.graduationYear,
      },

      stats: {
        score,
        profileCompletion,
        projects: totalProjects,
        notes: totalNotes,
        applications: totalApplications,
        pending: pendingApplications,
        shortlisted: shortlistedApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications,
        withdrawn: withdrawnApplications,
      },

      recentProjects,

      recentNotes,

      recentApplications,
    },
  };
};

// Search Students
export const searchStudents = async (query, page = 1, limit = 10) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const skip = (page - 1) * limit;

  const searchQuery = query?.trim() || "";

  const filter = {};

  if (searchQuery) {
    filter.$or = [
      {
        college: {
          $regex: searchQuery,
          $options: "i",
        },
      },
      {
        course: {
          $regex: searchQuery,
          $options: "i",
        },
      },
      {
        skills: {
          $regex: searchQuery,
          $options: "i",
        },
      },
    ];
  }

  const [students, totalStudents] = await Promise.all([
    StudentProfile.find(filter)
      .populate("user", "fullName isVerified")
      .select(
        "user college course skills profileImage bio followersCount followingCount",
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    StudentProfile.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalStudents / limit);

  return {
    success: true,

    query: searchQuery,

    currentPage: page,
    totalPages,
    totalStudents,

    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,

    students,
  };
};
