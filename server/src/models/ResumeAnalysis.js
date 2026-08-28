import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
      unique: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    resumeScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    skillsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    experienceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    educationScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    projectsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    completenessScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    missingSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    strengths: [
      {
        type: String,
        trim: true,
      },
    ],

    weaknesses: [
      {
        type: String,
        trim: true,
      },
    ],

    suggestions: [
      {
        type: String,
        trim: true,
      },
    ],

    recommendedRoles: [
      {
        type: String,
        trim: true,
      },
    ],

    keywordsFound: [
      {
        type: String,
        trim: true,
      },
    ],

    keywordsMissing: [
      {
        type: String,
        trim: true,
      },
    ],

    keywordMatchPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    sectionAnalysis: {
      summary: {
        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        feedback: {
          type: String,
          default: "",
        },
      },

      education: {
        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        feedback: {
          type: String,
          default: "",
        },
      },

      skills: {
        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        feedback: {
          type: String,
          default: "",
        },
      },

      projects: {
        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        feedback: {
          type: String,
          default: "",
        },
      },

      experience: {
        score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        feedback: {
          type: String,
          default: "",
        },
      },
    },

    improvementPriority: [
      {
        priority: {
          type: String,
          enum: ["High", "Medium", "Low"],
        },
        area: {
          type: String,
        },
        recommendation: {
          type: String,
        },
      },
    ],

    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

export default ResumeAnalysis;
