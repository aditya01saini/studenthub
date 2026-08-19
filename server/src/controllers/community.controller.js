import asyncHandler from "../utils/asyncHandler.js";
import { validateCommunityPost } from "../utils/validateCommunity.js";
import {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
  toggleCommunityPostLike,
} from "../services/community.service.js";

// =====================================================
// Create Post
// =====================================================

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const validation = validateCommunityPost({
    title,
    content,
    category,
  });

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    });
  }

  const result = await createCommunityPost({
    userId: req.user._id,
    title: title.trim(),
    content: content.trim(),
    category,
  });

  return res.status(201).json(result);
});

// =====================================================
// Get Posts
// =====================================================

export const getPosts = asyncHandler(async (req, res) => {
  const { page, limit, search, category } = req.query;

  const result = await getCommunityPosts({
    page,
    limit,
    search,
    category,
  });

  return res.status(200).json(result);
});

// =====================================================
// Get Single Post
// =====================================================

export const getPostById = asyncHandler(async (req, res) => {
  const result = await getCommunityPostById(req.params.postId);

  return res.status(200).json(result);
});

// =====================================================
// Update Own Post
// =====================================================

export const updatePost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const result = await updateCommunityPost({
    postId: req.params.postId,
    userId: req.user._id,
    title,
    content,
    category,
  });

  return res.status(200).json(result);
});

// =====================================================
// Delete Own Post
// =====================================================

export const deletePost = asyncHandler(async (req, res) => {
  const result = await deleteCommunityPost({
    postId: req.params.postId,
    userId: req.user._id,
  });

  return res.status(200).json(result);
});

// =====================================================
// Like / Unlike Post
// =====================================================

export const togglePostLike = asyncHandler(async (req, res) => {
  const result = await toggleCommunityPostLike({
    postId: req.params.postId,
    userId: req.user._id,
  });

  return res.status(200).json(result);
});
