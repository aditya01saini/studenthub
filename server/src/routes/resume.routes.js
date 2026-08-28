import express from "express";

import { analyzeStudentResumeController } from "../controllers/resume.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==========================================
// AI RESUME ANALYZER
// Logged-in students only
// ==========================================

router.post("/analyze", protect, analyzeStudentResumeController);

export default router;
