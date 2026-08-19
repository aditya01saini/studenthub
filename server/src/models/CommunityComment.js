import mongoose from "mongoose";

const communityCommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      required: true,
      index: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  },
);

communityCommentSchema.index({
  post: 1,
  createdAt: -1,
});

const CommunityComment = mongoose.model(
  "CommunityComment",
  communityCommentSchema,
);

export default CommunityComment;