import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },

    resourceType: {
      type: String,
      enum: ["Project", "Note", "Internship"],
      required: true,
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "resourceType",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate bookmarks
bookmarkSchema.index(
  {
    student: 1,
    resourceType: 1,
    resourceId: 1,
  },
  {
    unique: true,
  },
);

// Fast retrieval of student's saved items
bookmarkSchema.index({
  student: 1,
  createdAt: -1,
});

const Bookmark = mongoose.model(
  "Bookmark",
  bookmarkSchema,
);

export default Bookmark;