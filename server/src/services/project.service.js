import Project from "../models/Project.js";
import StudentProfile from "../models/StudentProfile.js";
import { uploadToCloudinary } from "./upload.service.js";

export const uploadProject = async (
  userId,
  projectData,
  files
) => {

  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  // Images Validation
  if (!files || files.length === 0) {
    const error = new Error(
      "Please upload at least one project image."
    );
    error.statusCode = 400;
    throw error;
  }

  if (files.length > 5) {
    const error = new Error(
      "Maximum 5 project images are allowed."
    );
    error.statusCode = 400;
    throw error;
  }

  // Category Validation
  const validCategories = [
    "Web Development",
    "Mobile App",
    "AI/ML",
    "Data Science",
    "Blockchain",
    "Cyber Security",
    "IoT",
    "Desktop Application",
    "Game Development",
    "Other",
  ];

  if (!validCategories.includes(projectData.category)) {
    const error = new Error("Invalid project category.");
    error.statusCode = 400;
    throw error;
  }

  // GitHub Repository Validation
  const githubRegex =
    /^https:\/\/(www\.)?github\.com\/[^/]+\/[^/]+\/?$/i;

  if (!githubRegex.test(projectData.githubUrl)) {
    const error = new Error(
      "Please provide a valid GitHub repository URL."
    );
    error.statusCode = 400;
    throw error;
  }

  // Clean Tech Stack
  const techStack = projectData.techStack
    ? [...new Set(projectData.techStack.map((tech) => tech.trim()))]
    : [];

  // Duplicate Project Check (Case-Insensitive)
  const existingProject = await Project.findOne({
    uploadedBy: student._id,
    title: {
      $regex: new RegExp(
        `^${projectData.title.trim()}$`,
        "i"
      ),
    },
    isActive: true,
  });

  if (existingProject) {
    const error = new Error(
      "You have already uploaded a project with this title."
    );
    error.statusCode = 400;
    throw error;
  }

  // Upload Images
  const imageUrls = [];

  for (const file of files) {
    const imageUrl = await uploadToCloudinary(
      file.path,
      "studenthub/project-images",
      "image"
    );

    imageUrls.push(imageUrl);
  }

  // Create Project
  const project = await Project.create({
    uploadedBy: student._id,

    title: projectData.title.trim(),

    description: projectData.description.trim(),

    category: projectData.category,

    techStack,

    githubUrl: projectData.githubUrl.trim(),

    liveDemoUrl:
      projectData.liveDemoUrl?.trim() || "",

    images: imageUrls,

    thumbnail: imageUrls[0],
  });

  return {
    success: true,
    message: "Project uploaded successfully.",
    project,
  };
};


export const getMyProjects = async (userId) => {

  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error(
      "Student profile not found."
    );
    error.statusCode = 404;
    throw error;
  }

  // Get Projects
  const projects = await Project.find({
  uploadedBy: student._id,
  isActive: true,
})
.select(
  "title category thumbnail githubUrl liveDemoUrl viewsCount likesCount createdAt"
)
.sort({
  createdAt: -1,
});

  return {
    success: true,
    totalProjects: projects.length,
    projects,
  };
};

export const getAllProjects = async (
  page = 1,
  limit = 12
) => {

  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const totalProjects = await Project.countDocuments({
    isActive: true,
  });

  const projects = await Project.find({
    isActive: true,
  })
    .populate({
      path: "uploadedBy",
      select: "college course profileImage",
      populate: {
        path: "user",
        select: "fullName",
      },
    })
    .select(
      "title category thumbnail githubUrl liveDemoUrl techStack viewsCount likesCount createdAt uploadedBy"
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

 return {
  success: true,

  currentPage: page,

  totalPages: Math.ceil(
    totalProjects / limit
  ),

  totalProjects,

  hasNextPage:
    page < Math.ceil(totalProjects / limit),

  hasPreviousPage:
    page > 1,

  projects,
}
}
export const getSingleProject = async (
  projectId
) => {

  // Increase View Count (Atomic Update)
  await Project.findByIdAndUpdate(
    projectId,
    {
      $inc: {
        viewsCount: 1,
      },
    }
  );

  // Get Updated Project
  const project = await Project.findOne({
    _id: projectId,
    isActive: true,
  })
    .populate({
      path: "uploadedBy",
      select:
        "college course profileImage bio skills github linkedin portfolio",
      populate: {
        path: "user",
        select: "fullName email",
      },
    });

  if (!project) {
    const error = new Error(
      "Project not found."
    );
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    project,
  };
};

export const updateProject = async (
  userId,
  projectId,
  projectData
) => {

  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  // Project
  const project = await Project.findOne({
    _id: projectId,
    isActive: true,
  });

  if (!project) {
    const error = new Error("Project not found.");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (
    project.uploadedBy.toString() !==
    student._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to update this project."
    );
    error.statusCode = 403;
    throw error;
  }

  // Duplicate Project Title Check
if (projectData.title) {

  const existingProject = await Project.findOne({
    uploadedBy: student._id,
    _id: { $ne: projectId },
    title: {
      $regex: new RegExp(
        `^${projectData.title.trim()}$`,
        "i"
      ),
    },
    isActive: true,
  });

  if (existingProject) {
    const error = new Error(
      "You already have another project with this title."
    );
    error.statusCode = 400;
    throw error;
  }

}



  // Category Validation
  const validCategories = [
    "Web Development",
    "Mobile App",
    "AI/ML",
    "Data Science",
    "Blockchain",
    "Cyber Security",
    "IoT",
    "Desktop Application",
    "Game Development",
    "Other",
  ];

  if (
    projectData.category &&
    !validCategories.includes(projectData.category)
  ) {
    const error = new Error(
      "Invalid project category."
    );
    error.statusCode = 400;
    throw error;
  }

  // GitHub URL Validation
  if (projectData.githubUrl) {

    const githubRegex =
      /^https:\/\/(www\.)?github\.com\/[^/]+\/[^/]+\/?$/i;

    if (!githubRegex.test(projectData.githubUrl)) {
      const error = new Error(
        "Please provide a valid GitHub repository URL."
      );
      error.statusCode = 400;
      throw error;
    }
  }

  // Live Demo URL Validation
if (projectData.liveDemoUrl) {

  try {
    new URL(projectData.liveDemoUrl);
  } catch {
    const error = new Error(
      "Please provide a valid Live Demo URL."
    );
    error.statusCode = 400;
    throw error;
  }

}

  // Tech Stack
  if (projectData.techStack) {

    project.techStack = [
      ...new Set(
        projectData.techStack.map((tech) =>
          tech.trim()
        )
      ),
    ];
  }

  project.title =
    projectData.title?.trim() ||
    project.title;

  project.description =
    projectData.description?.trim() ||
    project.description;

  project.category =
    projectData.category ||
    project.category;

  project.githubUrl =
    projectData.githubUrl?.trim() ||
    project.githubUrl;

  project.liveDemoUrl =
    projectData.liveDemoUrl?.trim() ||
    project.liveDemoUrl;

  await project.save();

  return {
    success: true,
    message:
      "Project updated successfully.",
    project,
  };
};

export const updateProjectImages = async (
  userId,
  projectId,
  files
) => {

  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error(
      "Student profile not found."
    );
    error.statusCode = 404;
    throw error;
  }

  // Project
  const project = await Project.findOne({
    _id: projectId,
    isActive: true,
  });

  if (!project) {
    const error = new Error("Project not found.");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (
    project.uploadedBy.toString() !==
    student._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to update this project."
    );
    error.statusCode = 403;
    throw error;
  }

  // Images Validation
  if (!files || files.length === 0) {
    const error = new Error(
      "Please upload at least one project image."
    );
    error.statusCode = 400;
    throw error;
  }

  if (files.length > 5) {
    const error = new Error(
      "Maximum 5 project images are allowed."
    );
    error.statusCode = 400;
    throw error;
  }

  // Upload New Images
  const imageUrls = [];

  for (const file of files) {

    const imageUrl = await uploadToCloudinary(
      file.path,
      "studenthub/project-images",
      "image"
    );

    imageUrls.push(imageUrl);

  }

  // Replace Images
  project.images = imageUrls;

  project.thumbnail = imageUrls[0];

  await project.save();

  return {
    success: true,
    message:
      "Project images updated successfully.",
    project,
  };
};

export const deleteProject = async (
  userId,
  projectId
) => {

  // Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error(
      "Student profile not found."
    );
    error.statusCode = 404;
    throw error;
  }

  // Project
  const project = await Project.findOne({
    _id: projectId,
    isActive: true,
  });

  if (!project) {
    const error = new Error(
      "Project not found."
    );
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (
    project.uploadedBy.toString() !==
    student._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to delete this project."
    );
    error.statusCode = 403;
    throw error;
  }

  // Soft Delete
  project.isActive = false;

  await project.save();

  return {
    success: true,
    message: "Project deleted successfully.",
  };
};

export const searchProjects = async (
  {
    search = "",
    category = "",
    techStack = "",
    sort = "latest",
    page = 1,
    limit = 12,
  }
) => {

  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const filter = {
    isActive: true,
  };

  // Search
  if (search.trim()) {

    filter.$or = [

      {
        title: {
          $regex: search.trim(),
          $options: "i",
        },
      },

      {
        description: {
          $regex: search.trim(),
          $options: "i",
        },
      },

    ];

  }

  // Category Filter
  if (category.trim()) {

    filter.category = category.trim();

  }

  // Tech Stack Filter
  if (techStack.trim()) {

    filter.techStack = {
      $in: [
        new RegExp(
          `^${techStack.trim()}$`,
          "i"
        ),
      ],
    };

  }

  // Sorting
  let sortOption = {};

  switch (sort) {

    case "oldest":
      sortOption = {
        createdAt: 1,
      };
      break;

    case "mostViewed":
      sortOption = {
        viewsCount: -1,
      };
      break;

    default:
      sortOption = {
        createdAt: -1,
      };

  }

  const totalProjects =
    await Project.countDocuments(filter);

  const projects = await Project.find(filter)
    .populate({
      path: "uploadedBy",
      select:
        "college course profileImage",
      populate: {
        path: "user",
        select: "fullName",
      },
    })
    .select(
      "title category thumbnail githubUrl liveDemoUrl techStack viewsCount likesCount createdAt uploadedBy"
    )
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  return {

    success: true,

    currentPage: page,

    totalPages: Math.ceil(
      totalProjects / limit
    ),

    totalProjects,

    hasNextPage:
      page <
      Math.ceil(
        totalProjects / limit
      ),

    hasPreviousPage:
      page > 1,

    projects,

  };

};