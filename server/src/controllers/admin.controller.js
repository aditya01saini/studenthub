import asyncHandler from "../utils/asyncHandler.js";

import {
  getAdminDashboard,
  getAdminUsers,
  getAdminUserById,
  updateAdminUserStatus,
  updateAdminUserVerification,
  getAdminRecruiters,
  updateRecruiterVerification,
  getAdminInternships,
  updateInternshipStatus,
  updateInternshipFeatured,
  getAdminApplications,
  getAdminApplicationById,
  updateAdminApplicationStatus,
  sendAdminNotification,
  getAdminNotificationHistory,
} from "../services/admin.service.js";
// ==========================================
// Get Admin Dashboard
// ==========================================

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getAdminDashboard();

  return res.status(200).json(dashboard);
});

// ==========================================
// Get All Users
// ==========================================

export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, search, role, isActive } = req.query;

  const result = await getAdminUsers({
    page,
    limit,
    search,
    role,
    isActive,
  });

  return res.status(200).json(result);
});

// ==========================================
// Get Single User
// ==========================================

export const getUserById = asyncHandler(async (req, res) => {
  const result = await getAdminUserById(req.params.userId);

  return res.status(200).json(result);
});

// ==========================================
// Update User Status
// ==========================================

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const result = await updateAdminUserStatus(
    req.user._id,
    req.params.userId,
    isActive,
  );

  return res.status(200).json(result);
});

// ==========================================
// Update User Verification
// ==========================================

export const updateUserVerification = asyncHandler(async (req, res) => {
  const { isVerified } = req.body;

  const result = await updateAdminUserVerification(
    req.params.userId,
    isVerified,
  );

  return res.status(200).json(result);
});

// ==========================================
// Get All Recruiters
// ==========================================

export const getRecruiters = asyncHandler(async (req, res) => {
  const { page, limit, search, verification } = req.query;

  const result = await getAdminRecruiters({
    page,
    limit,
    search,
    verification,
  });

  return res.status(200).json(result);
});

// ==========================================
// Verify / Unverify Recruiter Company
// ==========================================

export const updateRecruiterCompanyVerification = asyncHandler(
  async (req, res) => {
    const { isVerifiedCompany } = req.body;

    const result = await updateRecruiterVerification(
      req.params.recruiterProfileId,
      isVerifiedCompany,
    );

    return res.status(200).json(result);
  },
);

// ==========================================
// Get All Internships
// ==========================================

export const getInternships = asyncHandler(async (req, res) => {
  const { page, limit, search, category, workMode, status, featured } =
    req.query;

  const result = await getAdminInternships({
    page,
    limit,
    search,
    category,
    workMode,
    status,
    featured,
  });

  return res.status(200).json(result);
});

// ==========================================
// Activate / Deactivate Internship
// ==========================================

export const updateInternshipActiveStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const result = await updateInternshipStatus(
    req.params.internshipId,
    isActive,
  );

  return res.status(200).json(result);
});

// ==========================================
// Feature / Unfeature Internship
// ==========================================

export const updateInternshipFeaturedStatus = asyncHandler(async (req, res) => {
  const { isFeatured } = req.body;

  const result = await updateInternshipFeatured(
    req.params.internshipId,
    isFeatured,
  );

  return res.status(200).json(result);
});

// ==========================================
// Get All Applications
// ==========================================

export const getApplications = asyncHandler(async (req, res) => {
  const { page, limit, search, status, student, recruiter, internship } =
    req.query;

  const result = await getAdminApplications({
    page,
    limit,
    search,
    status,
    student,
    recruiter,
    internship,
  });

  return res.status(200).json(result);
});

// ==========================================
// Get Single Application Details
// ==========================================

export const getApplicationById = asyncHandler(async (req, res) => {
  const result = await getAdminApplicationById(req.params.applicationId);

  return res.status(200).json(result);
});

// ==========================================
// Send Admin Notification
// ==========================================

export const sendNotification = asyncHandler(async (req, res) => {
  const { target, userId, title, message } = req.body;

  const result = await sendAdminNotification({
    target,
    userId,
    title,
    message,
  });

  return res.status(201).json(result);
});

// ==========================================
// Get Admin Notification History
// ==========================================

export const getNotificationHistory = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const result = await getAdminNotificationHistory({
    page,
    limit,
    search,
  });

  return res.status(200).json(result);
});

// ==========================================
// Update Application Status
// ==========================================

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const result = await updateAdminApplicationStatus(
    req.params.applicationId,
    status,
  );

  return res.status(200).json(result);
});
