import express from "express";

import { analyzeResumeController } from "../controllers/resumeAnalysis.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/analyze", protect, analyzeResumeController);

export default router;
