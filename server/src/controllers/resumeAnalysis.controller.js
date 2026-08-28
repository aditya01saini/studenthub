import { analyzeStudentResume } from "../services/resumeAnalysis.service.js";

export const analyzeResumeController = async (req, res, next) => {
  try {
    const result = await analyzeStudentResume(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
