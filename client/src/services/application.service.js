import api from "./api";

// Student
export const applyForInternship = async (internshipId, data) => {
  const response = await api.post(`/applications/apply/${internshipId}`, data);

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my-applications");

  return response.data;
};

export const withdrawApplication = async (id) => {
  const response = await api.patch(`/applications/${id}/withdraw`);

  return response.data;
};

// Recruiter
export const getApplicants = async (internshipId) => {
  const response = await api.get(`/applications/internship/${internshipId}`);

  return response.data;
};

export const updateApplicationStatus = async (applicationId, data) => {
  const response = await api.patch(
    `/applications/${applicationId}/status`,
    data,
  );

  return response.data;
};

export const getRecruiterApplications = async (params) => {
  const response = await api.get("/applications/recruiter", {
    params,
  });

  return response.data;
};
