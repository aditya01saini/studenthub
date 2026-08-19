import api from "./api";

// Create Internship
export const createInternship = async (data) => {
  const response = await api.post("/internships", data);
  return response.data;
};

// Recruiter - My Internships
export const getMyInternships = async (params) => {
  const response = await api.get("/internships/my-internships", {
    params,
  });

  return response.data;
};

// Update Internship
export const updateInternship = async (id, data) => {
  const response = await api.put(`/internships/${id}`, data);
  return response.data;
};

// Delete Internship
export const deleteInternship = async (id) => {
  const response = await api.delete(`/internships/${id}`);
  return response.data;
};

// Get Single Internship
export const getInternship = async (id) => {
  const response = await api.get(`/internships/${id}`);
  return response.data;
};

// Student - Get All Internships
export const getAllInternships = async (params) => {
  const response = await api.get("/internships", {
    params,
  });

  return response.data;
};