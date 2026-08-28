import StudentProfile from "../models/StudentProfile.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

import { extractTextFromPDF } from "./resumeParser.service.js";
import { analyzeResume } from "./ai.service.js";

export const analyzeStudentResume = async (userId) => {
  // 1. Student profile find karo
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  // 2. Resume check
  if (!student.resume) {
    const error = new Error("Please upload your resume before analyzing.");
    error.statusCode = 400;
    throw error;
  }

  // 3. PDF se text extract karo
  const resumeText = await extractTextFromPDF(student.resume);

  // 4. Mistral AI se analysis
  const analysis = await analyzeResume(resumeText);

  // 5. Purana analysis check karo
  let resumeAnalysis = await ResumeAnalysis.findOne({
    student: student._id,
  });

  // 6. Agar analysis pehle se hai to update karo
  if (resumeAnalysis) {
    resumeAnalysis.resumeUrl = student.resume;

    Object.assign(resumeAnalysis, analysis);

    resumeAnalysis.analyzedAt = new Date();

    await resumeAnalysis.save();
  } else {
    // 7. First time analysis
    resumeAnalysis = await ResumeAnalysis.create({
      student: student._id,
      resumeUrl: student.resume,
      ...analysis,
      analyzedAt: new Date(),
    });
  }

  return {
    success: true,
    message: "Resume analyzed successfully.",
    analysis: resumeAnalysis,
  };
};
