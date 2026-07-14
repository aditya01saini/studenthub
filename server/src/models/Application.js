import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterProfile",
      required: true,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Shortlisted",
        "Accepted",
        "Rejected",
        "Withdrawn",
      ],
      default: "Pending",
    },

    recruiterRemark: {
      type: String,
      trim: true,
      default: "",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications
applicationSchema.index(
  {
    student: 1,
    internship: 1,
  },
  {
    unique: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;