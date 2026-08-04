import api from "./api";

export const getStudentDashboard = async () => {
  const response = await api.get("/student/dashboard");

  return response.data;
};

// Get logged-in student profile
export const getStudentProfile = async () => {
  const response = await api.get("/student/profile");

  return response.data;
};

// Update logged-in student profile
export const updateStudentProfile = async (profileData) => {
  const response = await api.put("/student/profile", profileData);

  return response.data;
};

// Upload student profile image
export const uploadStudentProfileImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("profileImage", imageFile);

  const response = await api.put("/student/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete student profile image
export const deleteStudentProfileImage = async () => {
  const response = await api.delete("/student/profile/image");

  return response.data;
};

// Upload student resume
export const uploadStudentResume = async (resumeFile) => {
  const formData = new FormData();

  formData.append("resume", resumeFile);

  const response = await api.put("/student/profile/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete student resume
export const deleteStudentResume = async () => {
  const response = await api.delete("/student/profile/resume");

  return response.data;
};

// Create student project
export const createStudentProject = async (projectData) => {
  const formData = new FormData();

  formData.append("title", projectData.title);
  formData.append("description", projectData.description);
  formData.append("category", projectData.category);
  formData.append("techStack", projectData.techStack);
  formData.append("githubUrl", projectData.githubUrl);
  formData.append("liveDemoUrl", projectData.liveDemoUrl || "");
  formData.append("projectStatus", projectData.projectStatus);
  projectData.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get logged-in student's projects
export const getMyProjects = async () => {
  const response = await api.get("/projects/my-projects");

  return response.data;
};

// Get single project details
export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);

  return response.data;
};

// Update student project
export const updateStudentProject = async (projectId, projectData) => {
  const response = await api.put(`/projects/${projectId}`, projectData);

  return response.data;
};

// Delete student project
export const deleteStudentProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);

  return response.data;
};

// Update project images
export const updateStudentProjectImages = async (projectId, images) => {
  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.put(`/projects/${projectId}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Upload student note
export const createStudentNote = async (noteData) => {
  const formData = new FormData();

  formData.append("title", noteData.title);
  formData.append("description", noteData.description);
  formData.append("subject", noteData.subject);
  formData.append("branch", noteData.branch);
  formData.append("semester", noteData.semester);
  formData.append("university", noteData.university);
  formData.append("academicYear", noteData.academicYear);
  formData.append("tags", noteData.tags);
  formData.append("pdf", noteData.pdf);

  const response = await api.post("/notes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get logged-in student's notes
export const getMyNotes = async () => {
  const response = await api.get("/notes/my-notes");

  return response.data;
};

// Get single note
export const getStudentNote = async (noteId) => {
  const response = await api.get(`/notes/${noteId}`);

  return response.data;
};

// Download student note
export const downloadStudentNote = async (noteId) => {
  const response = await api.get(`/notes/${noteId}/download`);

  return response.data;
};

// Update student note
export const updateStudentNote = async (noteId, noteData) => {
  const response = await api.put(`/notes/${noteId}`, noteData);

  return response.data;
};

// Delete student note
export const deleteStudentNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);

  return response.data;
};

// Get all available internships
export const getStudentInternships = async (params = {}) => {
  const response = await api.get("/internships", {
    params,
  });

  return response.data;
};

// Get single internship details
export const getStudentInternship = async (internshipId) => {
  const response = await api.get(`/internships/${internshipId}`);

  return response.data;
};

// Apply for internship
export const applyToInternship = async (internshipId, coverLetter = "") => {
  const response = await api.post(`/applications/apply/${internshipId}`, {
    coverLetter,
  });

  return response.data;
};

// Get My Applications
export const getMyApplications = async () => {
  const response = await api.get("/applications/my-applications");

  return response.data;
};

// Withdraw Application
export const withdrawApplication = async (applicationId) => {
  const response = await api.patch(`/applications/${applicationId}/withdraw`);

  return response.data;
};
