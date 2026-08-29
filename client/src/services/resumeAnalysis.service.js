import api from "./api";

const resumeAnalysisService = {
  analyzeResume: async () => {
    const response = await api.post("/resume-analysis/analyze");

    return response.data;
  },
};

export default resumeAnalysisService;
