import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export const applyInternship = async (userId, internshipId, coverLetter) => {
  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Resume Check
  if (!student.resume) {
    const error = new Error("Please upload your resume before applying.");
    error.statusCode = 400;
    throw error;
  }

  // Internship
  const internship = await Internship.findById(internshipId);

  if (!internship) {
    const error = new Error("Internship not found");
    error.statusCode = 404;
    throw error;
  }

  // Status Check
  if (internship.status !== "Open" || !internship.isActive) {
    const error = new Error("This internship is not accepting applications.");
    error.statusCode = 400;
    throw error;
  }

  // Deadline Check
  if (internship.applicationDeadline < new Date()) {
    const error = new Error("Application deadline has passed.");
    error.statusCode = 400;
    throw error;
  }

  // Check Existing Application
  const existingApplication = await Application.findOne({
    student: student._id,
    internship: internship._id,
  });

  // If already applied and not withdrawn
  if (existingApplication && existingApplication.status !== "Withdrawn") {
    const error = new Error("You have already applied for this internship.");
    error.statusCode = 400;
    throw error;
  }

  // If application was withdrawn, re-apply using same document
  if (existingApplication && existingApplication.status === "Withdrawn") {
    existingApplication.status = "Pending";
    existingApplication.coverLetter = coverLetter;
    existingApplication.resumeUrl = student.resume;
    existingApplication.recruiterRemark = "";
    existingApplication.reviewedAt = null;
    existingApplication.appliedAt = new Date();

    await existingApplication.save();

    internship.applicantsCount += 1;
    await internship.save();

    return {
      success: true,
      message: "Application submitted successfully.",
      application: existingApplication,
    };
  }

  // First Time Apply
  const application = await Application.create({
    student: student._id,
    recruiter: internship.recruiter,
    internship: internship._id,
    resumeUrl: student.resume,
    coverLetter,
  });

  internship.applicantsCount += 1;
  await internship.save();

  return {
    success: true,
    message: "Application submitted successfully.",
    application,
  };
};

export const getMyApplications = async (userId) => {
  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  const applications = await Application.find({
    student: student._id,
  })
    .populate({
      path: "internship",
      populate: {
        path: "recruiter",
        select: "companyName companyLogo",
      },
    })
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    count: applications.length,
    applications,
  };
};

export const withdrawApplication = async (userId, applicationId) => {
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found");
    error.statusCode = 404;
    throw error;
  }

  const application = await Application.findById(applicationId);

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  if (application.student.toString() !== student._id.toString()) {
    const error = new Error(
      "You are not authorized to withdraw this application.",
    );
    error.statusCode = 403;
    throw error;
  }

  if (
    application.status === "Accepted" ||
    application.status === "Rejected" ||
    application.status === "Withdrawn"
  ) {
    const error = new Error(
      `Application cannot be withdrawn because its current status is ${application.status}.`,
    );
    error.statusCode = 400;
    throw error;
  }

  application.status = "Withdrawn";

  await application.save();

  const internship = await Internship.findById(application.internship);

  if (internship && internship.applicantsCount > 0) {
    internship.applicantsCount -= 1;
    await internship.save();
  }

  return {
    success: true,
    message: "Application withdrawn successfully.",
    application,
  };
};

export const getInternshipApplicants = async (userId, internshipId) => {
  // Recruiter Profile
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!recruiter) {
    const error = new Error("Recruiter profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Internship
  const internship = await Internship.findById(internshipId);

  if (!internship) {
    const error = new Error("Internship not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (internship.recruiter.toString() !== recruiter._id.toString()) {
    const error = new Error(
      "You are not authorized to view applicants for this internship.",
    );
    error.statusCode = 403;
    throw error;
  }

  // Get Applications
  const applications = await Application.find({
    internship: internship._id,
  })
    .populate({
      path: "student",
      select: "college course graduationYear skills profileImage resume",
      populate: {
        path: "user",
        select: "fullName email",
      },
    })
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    internship: {
      id: internship._id,
      title: internship.title,
    },
    totalApplicants: applications.length,
    applications,
  };
};

export const updateApplicationStatus = async (
  userId,
  applicationId,
  status,
  recruiterRemark,
) => {
  // Valid Status
  const allowedStatuses = ["Shortlisted", "Accepted", "Rejected"];

  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid application status.");
    error.statusCode = 400;
    throw error;
  }

  // Recruiter Profile
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!recruiter) {
    const error = new Error("Recruiter profile not found.");
    error.statusCode = 404;
    throw error;
  }

  // Application
  const application = await Application.findById(applicationId);

  if (!application) {
    const error = new Error("Application not found.");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (application.recruiter.toString() !== recruiter._id.toString()) {
    const error = new Error(
      "You are not authorized to update this application.",
    );
    error.statusCode = 403;
    throw error;
  }

  // Final Status Check
  if (application.status === "Accepted" || application.status === "Rejected") {
    const error = new Error(
      `Application is already ${application.status} and cannot be updated anymore.`,
    );
    error.statusCode = 400;
    throw error;
  }

  // Withdrawn applications cannot be updated
  if (application.status === "Withdrawn") {
    const error = new Error("Withdrawn applications cannot be updated.");
    error.statusCode = 400;
    throw error;
  }

  // Same Status Check
  if (application.status === status) {
    const error = new Error(`Application is already ${status}.`);
    error.statusCode = 400;
    throw error;
  }

  application.status = status;
  application.recruiterRemark = recruiterRemark || "";
  application.reviewedAt = new Date();

  await application.save();

  return {
    success: true,
    message: `Application status updated to ${status}.`,
    application,
  };
};
