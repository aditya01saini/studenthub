import CommunityPost from "../models/CommunityPost.js";
import CommunityComment from "../models/CommunityComment.js";

// =====================================================
// Create Community Post
// =====================================================

export const createCommunityPost = async ({
  userId,
  title,
  content,
  category,
}) => {
  const post = await CommunityPost.create({
    author: userId,
    title,
    content,
    category,
  });

  await post.populate("author", "fullName email role isVerified");

  return {
    success: true,
    message: "Post created successfully",
    post,
  };
};

// =====================================================
// Get Community Posts
// =====================================================

export const getCommunityPosts = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "All",
}) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 10, 1), 50);

  const skip = (page - 1) * limit;

  const filter = {};

  // Category Filter
  if (category && category !== "All") {
    filter.category = category;
  }

  // Search
  if (search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");

    filter.$or = [
      {
        title: searchRegex,
      },
      {
        content: searchRegex,
      },
    ];
  }

  const [posts, totalPosts] = await Promise.all([
    CommunityPost.find(filter)
      .populate("author", "fullName email role isVerified")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    CommunityPost.countDocuments(filter),
  ]);

  return {
    success: true,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
    totalPosts,
    hasNextPage: page < Math.ceil(totalPosts / limit),
    hasPreviousPage: page > 1,
    posts,
  };
};

// =====================================================
// Get Single Community Post
// =====================================================

export const getCommunityPostById = async (postId) => {
  const post = await CommunityPost.findById(postId)
    .populate("author", "fullName email role isVerified")
    .lean();

  if (!post) {
    const error = new Error("Community post not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    post,
  };
};

// =====================================================
// Update Own Community Post
// =====================================================

export const updateCommunityPost = async ({
  postId,
  userId,
  title,
  content,
  category,
}) => {
  const post = await CommunityPost.findOne({
    _id: postId,
    author: userId,
  });

  if (!post) {
    const error = new Error("Post not found or you are not allowed to edit it");

    error.statusCode = 404;

    throw error;
  }

  if (title !== undefined) {
    post.title = title;
  }

  if (content !== undefined) {
    post.content = content;
  }

  if (category !== undefined) {
    post.category = category;
  }

  await post.save();

  await post.populate("author", "fullName email role isVerified");

  return {
    success: true,
    message: "Post updated successfully",
    post,
  };
};

// =====================================================
// Delete Own Community Post
// =====================================================

export const deleteCommunityPost = async ({ postId, userId }) => {
  const post = await CommunityPost.findOneAndDelete({
    _id: postId,
    author: userId,
  });

  if (!post) {
    const error = new Error(
      "Post not found or you are not allowed to delete it",
    );

    error.statusCode = 404;

    throw error;
  }

  // Delete all comments belonging to the post
  await CommunityComment.deleteMany({
    post: postId,
  });

  return {
    success: true,
    message: "Post deleted successfully",
  };
};

// =====================================================
// Like / Unlike Community Post
// =====================================================

export const toggleCommunityPostLike = async ({ postId, userId }) => {
  const post = await CommunityPost.findById(postId);

  if (!post) {
    const error = new Error("Community post not found");

    error.statusCode = 404;

    throw error;
  }

  const userObjectId = userId.toString();

  const alreadyLiked = post.likes.some(
    (like) => like.toString() === userObjectId,
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter((like) => like.toString() !== userObjectId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return {
    success: true,
    liked: !alreadyLiked,
    likesCount: post.likes.length,
  };
};
