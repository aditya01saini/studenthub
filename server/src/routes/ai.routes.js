import express from "express";

import {
  chatWithAI,
  getAIChats,
  getAIChatById,
  deleteAIChat,
} from "../controllers/ai.controller.js";

import {
  analyzeResumeController,
  analyzeGuestResumeController,
} from "../controllers/resumeAnalysis.controller.js";

import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import aiRateLimit from "../middlewares/aiRateLimit.middleware.js";

import { uploadResume } from "../middlewares/upload.middleware.js";

const router = express.Router();

// ==========================================
// AI CHAT
// Guest + Logged-in users
// Rate Limited
// ==========================================

router.post(
  "/chat",
  aiRateLimit,
  optionalAuth,
  chatWithAI,
);

// ==========================================
// GUEST RESUME ANALYZER
// LOGIN NOT REQUIRED
// ==========================================

router.post(
  "/analyze-guest",
  uploadResume.single("resume"),
  analyzeGuestResumeController,
);

// ==========================================
// STUDENT RESUME ANALYZER
// LOGGED-IN STUDENT
// ==========================================

router.post(
  "/analyze",
  protect,
  analyzeResumeController,
);

// ==========================================
// CHAT HISTORY
// Logged-in users only
// ==========================================

router.get(
  "/chats",
  protect,
  getAIChats,
);

// ==========================================
// SINGLE CHAT
// Logged-in users only
// ==========================================

router.get(
  "/chats/:chatId",
  protect,
  getAIChatById,
);

// ==========================================
// DELETE CHAT
// Logged-in users only
// ==========================================

router.delete(
  "/chats/:chatId",
  protect,
  deleteAIChat,
);

export default router;
