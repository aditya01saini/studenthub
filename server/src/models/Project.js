import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Mobile App",
        "AI/ML",
        "Data Science",
        "Blockchain",
        "Cyber Security",
        "IoT",
        "Desktop Application",
        "Game Development",
        "Other",
      ],
    },

    techStack: [
      {
        type: String,
        trim: true,
      },
    ],

    githubUrl: {
      type: String,
      required: true,
      trim: true,
    },

    liveDemoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    thumbnail: {
      type: String,
      default: "",
    },

    viewsCount: {
      type: Number,
      default: 0,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    featured: {
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
  }
);

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;