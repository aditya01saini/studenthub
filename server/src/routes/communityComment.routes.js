import express from "express";

import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/communityComment.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get comments for a post
router.get("/post/:postId", protect, getComments);

// Create comment on a post
router.post("/post/:postId", protect, createComment);

// Delete own comment
router.delete("/:commentId", protect, deleteComment);

export default router;
