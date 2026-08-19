import asyncHandler from "../utils/asyncHandler.js";
import { validateCommunityComment } from "../utils/validateCommunity.js";
import {
  createCommunityComment,
  getCommunityComments,
  deleteCommunityComment,
} from "../services/communityComment.service.js";

// =====================================================
// Create Comment
// =====================================================

export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const validation = validateCommunityComment({
    content,
  });

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    });
  }

  const result = await createCommunityComment({
    postId: req.params.postId,
    userId: req.user._id,
    content: content.trim(),
  });

  return res.status(201).json(result);
});
// =====================================================
// Get Comments
// =====================================================

export const getComments = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  const result = await getCommunityComments({
    postId: req.params.postId,
    page,
    limit,
  });

  return res.status(200).json(result);
});

// =====================================================
// Delete Own Comment
// =====================================================

export const deleteComment = asyncHandler(async (req, res) => {
  const result = await deleteCommunityComment({
    commentId: req.params.commentId,
    userId: req.user._id,
  });

  return res.status(200).json(result);
});
