import { uploadToCloudinary } from "./upload.service.js";
import { extractTextFromPDF } from "./resumeParser.service.js";
import { analyzeResume } from "./ai.service.js";

// ==========================================
// GUEST RESUME ANALYSIS
// ==========================================

export const analyzeGuestResume = async (file) => {
  let resumeUrl = null;

  try {
    // ==========================================
    // 1. Validate file
    // ==========================================

    if (!file) {
      const error = new Error("Please upload your resume PDF.");
      error.statusCode = 400;
      throw error;
    }

    if (file.mimetype !== "application/pdf") {
      const error = new Error("Only PDF resumes are allowed.");
      error.statusCode = 400;
      throw error;
    }

    // ==========================================
    // 2. Upload PDF to Cloudinary
    // ==========================================

    resumeUrl = await uploadToCloudinary(
      file.path,
      "studenthub/guest-resumes",
      "raw",
    );

    // ==========================================
    // 3. Extract text from PDF
    // ==========================================

    const resumeText = await extractTextFromPDF(resumeUrl);

    // ==========================================
    // 4. Analyze using Mistral AI
    // ==========================================

    const analysis = await analyzeResume(resumeText);

    // ==========================================
    // 5. Return analysis
    // ==========================================

    return {
      success: true,
      message: "Resume analyzed successfully.",
      analysis,
    };
  } catch (error) {
    console.error("Guest Resume Analysis Error:", error);

    throw error;
  }
};
