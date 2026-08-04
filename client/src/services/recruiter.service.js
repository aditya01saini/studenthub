import api from "./api";


// ==============================
// Recruiter Dashboard
// ==============================

export const getRecruiterDashboard = async () => {
  const response = await api.get("/recruiter/dashboard");

  return response.data;
};


// ==============================
// Recruiter Profile
// ==============================

export const getRecruiterProfile = async () => {
  const response = await api.get("/recruiter/profile");

  return response.data;
};

export const updateRecruiterProfile = async (profileData) => {
  const response = await api.put(
    "/recruiter/profile",
    profileData
  );

  return response.data;
};


// ==============================
// Company Logo
// ==============================

export const uploadCompanyLogo = async (logoFile) => {
  const formData = new FormData();

  formData.append("companyLogo", logoFile);

  const response = await api.put(
    "/recruiter/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteCompanyLogo = async () => {
  const response = await api.delete(
    "/recruiter/logo"
  );

  return response.data;
};


// ==============================
// Internships
// ==============================

export const getMyInternships = async () => {
  const response = await api.get(
    "/internships/my-internships"
  );

  return response.data;
};

export const createInternship = async (
  internshipData
) => {
  const response = await api.post(
    "/internships",
    internshipData
  );

  return response.data;
};

export const updateInternship = async (
  internshipId,
  internshipData
) => {
  const response = await api.put(
    `/internships/${internshipId}`,
    internshipData
  );

  return response.data;
};

export const deleteInternship = async (
  internshipId
) => {
  const response = await api.delete(
    `/internships/${internshipId}`
  );

  return response.data;
};

export const getInternship = async (
  internshipId
) => {
  const response = await api.get(
    `/internships/${internshipId}`
  );

  return response.data;
};


// ==============================
// Applications
// ==============================

export const getInternshipApplicants = async (
  internshipId
) => {
  const response = await api.get(
    `/applications/internship/${internshipId}`
  );

  return response.data;
};

// Get all internships (Public)

export const getAllInternships = async (params = {}) => {
  const response = await api.get("/internships", {
    params,
  });

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status,
  recruiterRemark = ""
) => {
  const response = await api.patch(
    `/applications/${applicationId}/status`,
    {
      status,
      recruiterRemark,
    }
  );

  return response.data;
};