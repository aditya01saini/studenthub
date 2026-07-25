import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
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
      default: "",
      trim: true,
      maxlength: 1000,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    university: {
      type: String,
      required: true,
      trim: true,
    },

    academicYear: {
      type: String,
      default: "",
      trim: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    downloadsCount: {
      type: Number,
      default: 0,
    },

    bookmarksCount: {
      type: Number,
      default: 0,
    },

    viewsCount: {
      type: Number,
      default: 0,
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

noteSchema.index({
  uploadedBy: 1,
  isActive: 1,
});

noteSchema.index({
  subject: 1,
});

noteSchema.index({
  branch: 1,
});


const Note = mongoose.model("Note", noteSchema);

export default Note;
