import { analyzeStudentResume } from "../services/resumeAnalysis.service.js";
import { analyzeGuestResume } from "../services/guestResumeAnalysis.service.js";

// ==========================================
// LOGGED-IN STUDENT RESUME ANALYSIS
// ==========================================

export const analyzeResumeController = async (req, res, next) => {
  try {
    const result = await analyzeStudentResume(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GUEST RESUME ANALYSIS
// LOGIN NOT REQUIRED
// ==========================================

export const analyzeGuestResumeController = async (req, res, next) => {
  try {
    // Resume file missing
    if (!req.file) {
      const error = new Error("Please upload your resume PDF.");
      error.statusCode = 400;
      throw error;
    }

    const result = await analyzeGuestResume(req.file);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

