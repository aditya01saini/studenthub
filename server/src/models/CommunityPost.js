import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    category: {
      type: String,
      enum: [
        "General",
        "Career",
        "Internship",
        "Projects",
        "Technology",
        "Study",
        "Interview",
      ],
      default: "General",
      index: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

communityPostSchema.index({
  createdAt: -1,
});

communityPostSchema.index({
  category: 1,
  createdAt: -1,
});

const CommunityPost = mongoose.model(
  "CommunityPost",
  communityPostSchema,
);

export default CommunityPost;