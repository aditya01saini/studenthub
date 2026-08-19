import User from "../models/User.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import StudentProfile from "../models/StudentProfile.js";
import { createNotification } from "./notification.service.js";
import Notification from "../models/Notification.js";
// import ApiError from "../utils/ApiError.js";
// =====================================================
// Admin Dashboard
// =====================================================

export const getAdminDashboard = async () => {
  // ===================================================
  // 1. Basic Platform Statistics
  // ===================================================

  const [
    totalUsers,
    totalStudents,
    totalRecruiters,
    totalAdmins,

    activeUsers,
    inactiveUsers,

    verifiedUsers,

    totalInternships,
    openInternships,
    closedInternships,
    featuredInternships,

    totalApplications,
    pendingApplications,
    shortlistedApplications,
    acceptedApplications,
    rejectedApplications,
    withdrawnApplications,

    verifiedRecruiters,
    unverifiedRecruiters,

    recruiterProfiles,
  ] = await Promise.all([
    // ---------------- Users ----------------

    User.countDocuments(),

    User.countDocuments({
      role: "student",
    }),

    User.countDocuments({
      role: "recruiter",
    }),

    User.countDocuments({
      role: "admin",
    }),

    // isActive true OR missing
    User.countDocuments({
      isActive: {
        $ne: false,
      },
    }),

    User.countDocuments({
      isActive: false,
    }),

    User.countDocuments({
      isVerified: true,
    }),

    // ---------------- Internships ----------------

    Internship.countDocuments(),

    Internship.countDocuments({
      status: "Open",
    }),

    Internship.countDocuments({
      status: "Closed",
    }),

    Internship.countDocuments({
      isFeatured: true,
    }),

    // ---------------- Applications ----------------

    Application.countDocuments(),

    Application.countDocuments({
      status: "Pending",
    }),

    Application.countDocuments({
      status: "Shortlisted",
    }),

    Application.countDocuments({
      status: "Accepted",
    }),

    Application.countDocuments({
      status: "Rejected",
    }),

    Application.countDocuments({
      status: "Withdrawn",
    }),

    // ---------------- Recruiters ----------------

    RecruiterProfile.countDocuments({
      isVerifiedCompany: true,
    }),

    RecruiterProfile.countDocuments({
      isVerifiedCompany: false,
    }),

    RecruiterProfile.countDocuments(),
  ]);

  // ===================================================
  // 2. Recruiter Profile Completeness
  // ===================================================

  const recruiterProfileIncomplete = Math.max(
    totalRecruiters - recruiterProfiles,
    0,
  );

  // ===================================================
  // 3. Application Business Metrics
  // ===================================================

  const safePercentage = (value, total) => {
    if (!total) {
      return 0;
    }

    return Number(((value / total) * 100).toFixed(1));
  };

  const applicationAcceptanceRate = safePercentage(
    acceptedApplications,
    totalApplications,
  );

  const applicationShortlistRate = safePercentage(
    shortlistedApplications,
    totalApplications,
  );

  const applicationRejectionRate = safePercentage(
    rejectedApplications,
    totalApplications,
  );

  const applicationWithdrawalRate = safePercentage(
    withdrawnApplications,
    totalApplications,
  );
  const hiringDecisionCount = acceptedApplications + shortlistedApplications;

  const hiringConversionRate = safePercentage(
    acceptedApplications,
    hiringDecisionCount,
  );

  // ===================================================
  // 4. User Growth
  // ===================================================

  const userGrowth = await User.aggregate([
    {
      $match: {
        role: {
          $in: ["student", "recruiter"],
        },
      },
    },

    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },

          month: {
            $month: "$createdAt",
          },
        },

        users: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  // ===================================================
  // 5. Internship Growth
  // ===================================================

  const internshipGrowth = await Internship.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },

          month: {
            $month: "$createdAt",
          },
        },

        internships: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  // ===================================================
  // 6. Application Growth
  // ===================================================

  const applicationGrowth = await Application.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: "$appliedAt",
          },

          month: {
            $month: "$appliedAt",
          },
        },

        applications: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  // ===================================================
  // 7. Application Status Distribution
  // ===================================================

  const applicationStatus = await Application.aggregate([
    {
      $group: {
        _id: "$status",

        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        count: -1,
      },
    },
  ]);

  // ===================================================
  // 8. Internship Category Distribution
  // ===================================================

  const internshipCategories = await Internship.aggregate([
    {
      $group: {
        _id: "$category",

        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        count: -1,
      },
    },
  ]);

  // ===================================================
  // 9. Internship Work Mode Distribution
  // ===================================================

  const internshipWorkModes = await Internship.aggregate([
    {
      $group: {
        _id: "$workMode",

        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        count: -1,
      },
    },
  ]);

  // ===================================================
  // 10. Internship Status Distribution
  // ===================================================

  const internshipStatus = await Internship.aggregate([
    {
      $group: {
        _id: "$status",

        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        count: -1,
      },
    },
  ]);

  // ===================================================
  // 11. Final Dashboard Response
  // ===================================================

  return {
    success: true,

    // =================================================
    // Main KPI Statistics
    // =================================================

    stats: {
      users: {
        total: totalUsers,
        students: totalStudents,
        recruiters: totalRecruiters,
        admins: totalAdmins,

        active: activeUsers,
        inactive: inactiveUsers,

        verified: verifiedUsers,
      },

      recruiters: {
        total: totalRecruiters,

        verified: verifiedRecruiters,

        unverified: unverifiedRecruiters,

        profileIncomplete: recruiterProfileIncomplete,
      },

      internships: {
        total: totalInternships,

        open: openInternships,

        closed: closedInternships,

        featured: featuredInternships,
      },

      applications: {
        total: totalApplications,

        pending: pendingApplications,

        shortlisted: shortlistedApplications,

        accepted: acceptedApplications,

        rejected: rejectedApplications,

        withdrawn: withdrawnApplications,

        // Business KPIs
        acceptanceRate: applicationAcceptanceRate,

        shortlistRate: applicationShortlistRate,

        rejectionRate: applicationRejectionRate,

        withdrawalRate: applicationWithdrawalRate,

        hiringConversionRate: hiringConversionRate,
      },
    },

    // =================================================
    // Real Analytics
    // =================================================

    analytics: {
      userGrowth,

      internshipGrowth,

      applicationGrowth,

      applicationStatus,

      internshipCategories,

      internshipWorkModes,

      internshipStatus,
    },
  };
};

// =====================================================
// Get All Users
// =====================================================

export const getAdminUsers = async ({
  page = 1,
  limit = 20,
  search = "",
  role = "",
  isActive,
} = {}) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const skip = (page - 1) * limit;

  const filter = {};

  // -----------------------------------------------
  // Role Filter
  // -----------------------------------------------

  if (role && ["student", "recruiter", "admin"].includes(role)) {
    filter.role = role;
  }

  // -----------------------------------------------
  // Active / Inactive Filter
  // -----------------------------------------------

  if (isActive === "true") {
    filter.isActive = {
      $ne: false,
    };
  }

  if (isActive === "false") {
    filter.isActive = false;
  }

  // -----------------------------------------------
  // Search
  // -----------------------------------------------

  if (search.trim()) {
    filter.$or = [
      {
        fullName: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        email: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  // -----------------------------------------------
  // Query Users
  // -----------------------------------------------

  const [users, totalUsers] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments(filter),
  ]);

  return {
    success: true,

    currentPage: page,

    totalPages: Math.ceil(totalUsers / limit),

    totalUsers,

    hasNextPage: page < Math.ceil(totalUsers / limit),

    hasPreviousPage: page > 1,

    users,
  };
};

// =====================================================
// Get Single User Details
// =====================================================

export const getAdminUserById = async (userId) => {
  const user = await User.findById(userId).select("-password").lean();

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    user,
  };
};

// =====================================================
// Update User Active Status
// =====================================================

export const updateAdminUserStatus = async (adminId, userId, isActive) => {
  // Admin apna account deactivate nahi kar sakta
  if (adminId.toString() === userId.toString()) {
    const error = new Error("You cannot change your own account status.");

    error.statusCode = 400;

    throw error;
  }

  // Validate boolean
  if (typeof isActive !== "boolean") {
    const error = new Error("isActive must be a boolean value.");

    error.statusCode = 400;

    throw error;
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    const error = new Error("User not found.");

    error.statusCode = 404;

    throw error;
  }

  user.isActive = isActive;

  await user.save();

  return {
    success: true,

    message: isActive
      ? "User activated successfully."
      : "User deactivated successfully.",

    user,
  };
};

// =====================================================
// Update User Verification Status
// =====================================================

export const updateAdminUserVerification = async (userId, isVerified) => {
  // Validate boolean
  if (typeof isVerified !== "boolean") {
    const error = new Error("isVerified must be a boolean value.");

    error.statusCode = 400;

    throw error;
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    const error = new Error("User not found.");

    error.statusCode = 404;

    throw error;
  }

  user.isVerified = isVerified;

  await user.save();

  return {
    success: true,

    message: isVerified
      ? "User verified successfully."
      : "User verification removed successfully.",

    user,
  };
};

// =====================================================
// Get All Recruiters
// =====================================================

export const getAdminRecruiters = async ({
  page = 1,
  limit = 20,
  search = "",
  verification = "",
} = {}) => {
  page = Math.max(Number(page) || 1, 1);

  limit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const skip = (page - 1) * limit;

  // -----------------------------------------------
  // Recruiter Profile Filter
  // -----------------------------------------------

  const profileFilter = {};

  if (verification === "verified") {
    profileFilter.isVerifiedCompany = true;
  }

  if (verification === "unverified") {
    profileFilter.isVerifiedCompany = false;
  }

  // -----------------------------------------------
  // Search
  // -----------------------------------------------

  if (search.trim()) {
    profileFilter.$or = [
      {
        companyName: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        industry: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        location: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  // -----------------------------------------------
  // Fetch Recruiters
  // -----------------------------------------------

  const [recruiters, totalRecruiters] = await Promise.all([
    RecruiterProfile.find(profileFilter)
      .populate(
        "user",
        "fullName email role isVerified isActive lastLoginAt createdAt",
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    RecruiterProfile.countDocuments(profileFilter),
  ]);

  return {
    success: true,

    currentPage: page,

    totalPages: Math.ceil(totalRecruiters / limit),

    totalRecruiters,

    hasNextPage: page < Math.ceil(totalRecruiters / limit),

    hasPreviousPage: page > 1,

    recruiters,
  };
};

// =====================================================
// Update Recruiter Company Verification
// =====================================================

export const updateRecruiterVerification = async (
  recruiterProfileId,
  isVerifiedCompany,
) => {
  if (typeof isVerifiedCompany !== "boolean") {
    const error = new Error("isVerifiedCompany must be a boolean value.");

    error.statusCode = 400;

    throw error;
  }

  const recruiter = await RecruiterProfile.findById(recruiterProfileId);

  if (!recruiter) {
    const error = new Error("Recruiter profile not found.");

    error.statusCode = 404;

    throw error;
  }

  recruiter.isVerifiedCompany = isVerifiedCompany;

  await recruiter.save();

  return {
    success: true,

    message: isVerifiedCompany
      ? "Company verified successfully."
      : "Company verification removed successfully.",

    recruiter,
  };
};

// =====================================================
// Get All Internships
// =====================================================

export const getAdminInternships = async ({
  page = 1,
  limit = 20,
  search = "",
  category = "",
  workMode = "",
  status = "",
  featured = "",
} = {}) => {
  page = Math.max(Number(page) || 1, 1);

  limit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const skip = (page - 1) * limit;

  const filter = {};

  // -----------------------------------------------
  // Search
  // -----------------------------------------------

  if (search.trim()) {
    filter.$or = [
      {
        title: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        description: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  // -----------------------------------------------
  // Category Filter
  // -----------------------------------------------

  if (category.trim()) {
    filter.category = category.trim();
  }

  // -----------------------------------------------
  // Work Mode Filter
  // -----------------------------------------------

  if (workMode && ["Remote", "Hybrid", "Onsite"].includes(workMode)) {
    filter.workMode = workMode;
  }

  // -----------------------------------------------
  // Status Filter
  // -----------------------------------------------

  if (status && ["Open", "Closed"].includes(status)) {
    filter.status = status;
  }

  // -----------------------------------------------
  // Featured Filter
  // -----------------------------------------------

  if (featured === "true") {
    filter.isFeatured = true;
  }

  if (featured === "false") {
    filter.isFeatured = false;
  }

  // -----------------------------------------------
  // Fetch Internships
  // -----------------------------------------------

  const [internships, totalInternships] = await Promise.all([
    Internship.find(filter)
      .populate(
        "recruiter",
        "companyName industry location companyLogo isVerifiedCompany user",
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Internship.countDocuments(filter),
  ]);

  return {
    success: true,

    currentPage: page,

    totalPages: Math.ceil(totalInternships / limit),

    totalInternships,

    hasNextPage: page < Math.ceil(totalInternships / limit),

    hasPreviousPage: page > 1,

    internships,
  };
};
// =====================================================
// Update Internship Active Status
// =====================================================

export const updateInternshipStatus = async (internshipId, isActive) => {
  if (typeof isActive !== "boolean") {
    const error = new Error("isActive must be a boolean value.");

    error.statusCode = 400;

    throw error;
  }

  const internship = await Internship.findById(internshipId);

  if (!internship) {
    const error = new Error("Internship not found.");

    error.statusCode = 404;

    throw error;
  }

  internship.isActive = isActive;

  await internship.save();

  return {
    success: true,

    message: isActive
      ? "Internship activated successfully."
      : "Internship deactivated successfully.",

    internship,
  };
};

// =====================================================
// Update Internship Featured Status
// =====================================================

export const updateInternshipFeatured = async (internshipId, isFeatured) => {
  if (typeof isFeatured !== "boolean") {
    const error = new Error("isFeatured must be a boolean value.");

    error.statusCode = 400;

    throw error;
  }

  const internship = await Internship.findById(internshipId);

  if (!internship) {
    const error = new Error("Internship not found.");

    error.statusCode = 404;

    throw error;
  }

  internship.isFeatured = isFeatured;

  await internship.save();

  return {
    success: true,

    message: isFeatured
      ? "Internship featured successfully."
      : "Internship removed from featured successfully.",

    internship,
  };
};

// =====================================================
// Get All Applications
// =====================================================

// =====================================================
// Get All Applications - Admin
// =====================================================

export const getAdminApplications = async ({
  page = 1,
  limit = 20,
  search = "",
  status = "",
  student = "",
  recruiter = "",
  internship = "",
} = {}) => {
  page = Math.max(Number(page) || 1, 1);

  limit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const skip = (page - 1) * limit;

  const filter = {};

  // ===================================================
  // Status Filter
  // ===================================================

  if (
    status &&
    ["Pending", "Shortlisted", "Accepted", "Rejected", "Withdrawn"].includes(
      status,
    )
  ) {
    filter.status = status;
  }

  // ===================================================
  // Student Filter
  // ===================================================

  if (student.trim()) {
    const studentProfiles = await StudentProfile.find({
      $or: [
        {
          _id: student.trim(),
        },
      ],
    }).select("_id");

    filter.student = {
      $in: studentProfiles.map((profile) => profile._id),
    };
  }

  // ===================================================
  // Recruiter Filter
  // ===================================================

  if (recruiter.trim()) {
    const recruiterProfiles = await RecruiterProfile.find({
      $or: [
        {
          _id: recruiter.trim(),
        },
      ],
    }).select("_id");

    filter.recruiter = {
      $in: recruiterProfiles.map((profile) => profile._id),
    };
  }

  // ===================================================
  // Internship Filter
  // ===================================================

  if (internship.trim()) {
    filter.internship = internship.trim();
  }

  // ===================================================
  // Search
  // ===================================================

  if (search.trim()) {
    const searchRegex = {
      $regex: search.trim(),
      $options: "i",
    };

    // -----------------------------------------------
    // Find matching student profiles
    // -----------------------------------------------

    const matchingStudentUsers = await User.find({
      role: "student",
      $or: [
        {
          fullName: searchRegex,
        },
        {
          email: searchRegex,
        },
      ],
    }).select("_id");

    const studentUserIds = matchingStudentUsers.map((user) => user._id);

    const matchingStudentProfiles = await StudentProfile.find({
      user: {
        $in: studentUserIds,
      },
    }).select("_id");

    const studentProfileIds = matchingStudentProfiles.map(
      (profile) => profile._id,
    );

    // -----------------------------------------------
    // Find matching recruiter users
    // -----------------------------------------------

    const matchingRecruiterUsers = await User.find({
      role: "recruiter",
      $or: [
        {
          fullName: searchRegex,
        },
        {
          email: searchRegex,
        },
      ],
    }).select("_id");

    const recruiterUserIds = matchingRecruiterUsers.map((user) => user._id);

    const matchingRecruiterProfiles = await RecruiterProfile.find({
      $or: [
        {
          user: {
            $in: recruiterUserIds,
          },
        },
        {
          companyName: searchRegex,
        },
      ],
    }).select("_id");

    const recruiterProfileIds = matchingRecruiterProfiles.map(
      (profile) => profile._id,
    );

    // -----------------------------------------------
    // Find matching internships
    // -----------------------------------------------

    const matchingInternships = await Internship.find({
      $or: [
        {
          title: searchRegex,
        },
        {
          description: searchRegex,
        },
      ],
    }).select("_id");

    const internshipIds = matchingInternships.map(
      (internship) => internship._id,
    );

    // -----------------------------------------------
    // Apply search to Application
    // -----------------------------------------------

    filter.$or = [
      {
        student: {
          $in: studentProfileIds,
        },
      },
      {
        recruiter: {
          $in: recruiterProfileIds,
        },
      },
      {
        internship: {
          $in: internshipIds,
        },
      },
    ];
  }

  // ===================================================
  // Fetch Applications + Accurate Count
  // ===================================================

  const [applications, totalApplications] = await Promise.all([
    Application.find(filter)
      .populate(
        "student",
        "user college course graduationYear bio skills github linkedin portfolio resume profileImage",
      )
      .populate(
        "recruiter",
        "user companyName website industry companySize location description companyLogo isVerifiedCompany",
      )
      .populate(
        "internship",
        "title description category workMode location stipend duration experience skillsRequired openings applicationDeadline startDate perks certificateProvided status isFeatured",
      )
      .sort({
        appliedAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Application.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalApplications / limit);

  return {
    success: true,

    currentPage: page,

    totalPages,

    totalApplications,

    hasNextPage: page < totalPages,

    hasPreviousPage: page > 1,

    applications,
  };
};

// =====================================================
// Get Single Application Details
// =====================================================

export const getAdminApplicationById = async (applicationId) => {
  const application = await Application.findById(applicationId)
    .populate(
      "student",
      "user college course graduationYear bio skills github linkedin portfolio resume profileImage",
    )
    .populate(
      "recruiter",
      "user companyName website industry companySize location description companyLogo isVerifiedCompany",
    )
    .populate(
      "internship",
      "title description category workMode location stipend duration experience skillsRequired openings applicationDeadline startDate perks certificateProvided status isFeatured",
    )
    .lean();

  if (!application) {
    const error = new Error("Application not found.");

    error.statusCode = 404;

    throw error;
  }

  return {
    success: true,
    application,
  };
};

// =====================================================
// Send Admin Notification
// =====================================================

export const sendAdminNotification = async ({
  target,
  userId,
  title,
  message,
}) => {
  if (!title?.trim() || !message?.trim()) {
    const error = new Error("Title and message are required.");

    error.statusCode = 400;
    throw error;
  }

  let filter = {};

  if (target === "students") {
    filter.role = "student";
  } else if (target === "recruiters") {
    filter.role = "recruiter";
  } else if (target === "all") {
    filter.role = {
      $in: ["student", "recruiter"],
    };
  } else if (target === "user") {
    if (!userId) {
      const error = new Error("User ID is required.");

      error.statusCode = 400;
      throw error;
    }

    filter._id = userId;
  } else {
    const error = new Error("Invalid notification target.");

    error.statusCode = 400;
    throw error;
  }

  const users = await User.find(filter).select("_id");

  if (users.length === 0) {
    const error = new Error("No users found for this target.");

    error.statusCode = 404;
    throw error;
  }

  await Promise.all(
    users.map((user) =>
      createNotification({
        recipient: user._id,
        type: "ADMIN_ANNOUNCEMENT",

        // Preserve admin notification target
        target,

        title: title.trim(),
        message: message.trim(),
      }),
    ),
  );

  return {
    success: true,
    message: "Notification sent successfully.",
    recipientCount: users.length,
  };
};

// =====================================================
// Get Admin Notification History
// =====================================================

export const getAdminNotificationHistory = async ({
  page = 1,
  limit = 20,
  search = "",
} = {}) => {
  page = Math.max(Number(page) || 1, 1);

  limit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const skip = (page - 1) * limit;

  const filter = {};

  // Search by title or message
  if (search.trim()) {
    filter.$or = [
      {
        title: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        message: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  const [notifications, totalNotifications] = await Promise.all([
    Notification.find(filter)
      .populate("recipient", "fullName email role")
      .populate("sender", "fullName email role")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Notification.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotifications / limit);

  return {
    success: true,

    currentPage: page,

    totalPages,

    totalNotifications,

    hasNextPage: page < totalPages,

    hasPreviousPage: page > 1,

    notifications,
  };
};

// ==========================================
// Update Application Status
// ==========================================

export const updateAdminApplicationStatus = async (applicationId, status) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    const error = new Error("Application not found.");

    error.statusCode = 404;

    throw error;
  }

  const allowedStatuses = [
    "Pending",
    "Shortlisted",
    "Accepted",
    "Rejected",
    "Withdrawn",
  ];

  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid application status.");

    error.statusCode = 400;

    throw error;
  }

  application.status = status;

  await application.save();

  return {
    success: true,

    message: `Application ${status.toLowerCase()} successfully.`,

    application,
  };
};
