import express from "express";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  togglePostLike,
} from "../controllers/community.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all community posts
router.get("/", protect, getPosts);

// Create a community post
router.post("/", protect, createPost);

// Get single community post
router.get("/:postId", protect, getPostById);

// Update own community post
router.patch("/:postId", protect, updatePost);

// Delete own community post
router.delete("/:postId", protect, deletePost);

// Like / Unlike post
router.post("/:postId/like", protect, togglePostLike);

export default router;
