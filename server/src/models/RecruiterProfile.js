import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    companySize: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const RecruiterProfile = mongoose.model(
  "RecruiterProfile",
  recruiterProfileSchema,
);

export default RecruiterProfile;
