import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterProfile",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Mobile App Development",
        "Software Development",
        "AI/ML",
        "Data Science",
        "Cyber Security",
        "UI/UX Design",
        "DevOps",
        "Cloud Computing",
        "Blockchain",
        "Digital Marketing",
        "Content Writing",
        "Graphic Design",
        "Human Resources",
        "Finance",
        "Business Development",
        "Sales",
        "Other",
      ],
    },

    workMode: {
      type: String,
      required: true,
      enum: ["Remote", "Hybrid", "Onsite"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    stipend: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: String,
      required: true,
      enum: [
        "1 Month",
        "2 Months",
        "3 Months",
        "4 Months",
        "5 Months",
        "6 Months",
        "12 Months",
      ],
    },

    experience: {
      type: String,
      default: "Fresher",
      enum: ["Fresher", "0-1 Years", "1-2 Years", "2-3 Years"],
    },

    skillsRequired: [
      {
        type: String,
        trim: true,
      },
    ],

    openings: {
      type: Number,
      required: true,
      min: 1,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    perks: [
      {
        type: String,
        trim: true,
      },
    ],

    certificateProvided: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    applicantsCount: {
      type: Number,
      default: 0,
    },

    viewsCount: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
