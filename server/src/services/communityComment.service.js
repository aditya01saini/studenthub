import CommunityPost from "../models/CommunityPost.js";
import CommunityComment from "../models/CommunityComment.js";

// =====================================================
// Create Comment
// =====================================================

export const createCommunityComment = async ({
  postId,
  userId,
  content,
}) => {
  const post = await CommunityPost.findById(postId);

  if (!post) {
    const error = new Error("Community post not found");

    error.statusCode = 404;

    throw error;
  }

  const comment = await CommunityComment.create({
    post: postId,
    author: userId,
    content,
  });

  await CommunityPost.findByIdAndUpdate(postId, {
    $inc: {
      commentsCount: 1,
    },
  });

  await comment.populate(
    "author",
    "fullName email role isVerified",
  );

  return {
    success: true,
    message: "Comment added successfully",
    comment,
  };
};

// =====================================================
// Get Comments For Post
// =====================================================

export const getCommunityComments = async ({
  postId,
  page = 1,
  limit = 20,
}) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 20, 1), 50);

  const skip = (page - 1) * limit;

  const postExists = await CommunityPost.exists({
    _id: postId,
  });

  if (!postExists) {
    const error = new Error("Community post not found");

    error.statusCode = 404;

    throw error;
  }

  const [comments, totalComments] = await Promise.all([
    CommunityComment.find({
      post: postId,
    })
      .populate(
        "author",
        "fullName email role isVerified",
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    CommunityComment.countDocuments({
      post: postId,
    }),
  ]);

  return {
    success: true,
    currentPage: page,
    totalPages: Math.ceil(totalComments / limit),
    totalComments,
    hasNextPage:
      page < Math.ceil(totalComments / limit),
    hasPreviousPage: page > 1,
    comments,
  };
};

// =====================================================
// Delete Own Comment
// =====================================================

export const deleteCommunityComment = async ({
  commentId,
  userId,
}) => {
  const comment = await CommunityComment.findOneAndDelete({
    _id: commentId,
    author: userId,
  });

  if (!comment) {
    const error = new Error(
      "Comment not found or you are not allowed to delete it",
    );

    error.statusCode = 404;

    throw error;
  }

  await CommunityPost.findByIdAndUpdate(comment.post, {
    $inc: {
      commentsCount: -1,
    },
  });

  return {
    success: true,
    message: "Comment deleted successfully",
  };
};