import api from "./api";

// ==========================================
// Recruiter Dashboard
// ==========================================

export const getRecruiterDashboard = async () => {
  const response = await api.get("/recruiter/dashboard");

  return response.data;
};

// ==========================================
// Recruiter Profile
// ==========================================

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

// ==========================================
// Company Logo
// ==========================================

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