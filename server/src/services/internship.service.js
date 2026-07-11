import Internship from "../models/Internship.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export const createInternship = async (userId, internshipData) => {
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!recruiter) {
    const error = new Error("Recruiter profile not found");
    error.statusCode = 404;
    throw error;
  }

  const internship = await Internship.create({
    recruiter: recruiter._id,
    ...internshipData,
  });

  return {
    success: true,
    message: "Internship created successfully",
    internship,
  };
};

export const getRecruiterInternships = async (userId) => {
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!recruiter) {
    const error = new Error("Recruiter profile not found");
    error.statusCode = 404;
    throw error;
  }

  const internships = await Internship.find({
    recruiter: recruiter._id,
  }).sort({
    createdAt: -1,
  });

  return {
    success: true,
    count: internships.length,
    internships,
  };
};

export const updateInternship = async (
  userId,
  internshipId,
  internshipData
) => {
  // Recruiter Profile
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!recruiter) {
    const error = new Error("Recruiter profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Internship
  const internship = await Internship.findById(internshipId);

  if (!internship) {
    const error = new Error("Internship not found");
    error.statusCode = 404;
    throw error;
  }

  // Security Check
  if (
    internship.recruiter.toString() !== recruiter._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to update this internship"
    );
    error.statusCode = 403;
    throw error;
  }

  Object.assign(internship, internshipData);

  await internship.save();

  return {
    success: true,
    message: "Internship updated successfully",
    internship,
  };
};

export const deleteInternship = async (
  userId,
  internshipId
) => {
  // Recruiter Profile
  const recruiter = await RecruiterProfile.findOne({
    user: userId,
  });

  if (!recruiter) {
    const error = new Error("Recruiter profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Internship
  const internship = await Internship.findById(
    internshipId
  );

  if (!internship) {
    const error = new Error("Internship not found");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (
    internship.recruiter.toString() !==
    recruiter._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to delete this internship"
    );
    error.statusCode = 403;
    throw error;
  }

  await internship.deleteOne();

  return {
    success: true,
    message: "Internship deleted successfully",
  };
};

export const getSingleInternship = async (internshipId) => {
  const internship = await Internship.findById(internshipId)
    .populate({
      path: "recruiter",
      populate: {
        path: "user",
        select: "fullName isVerified",
      },
    });

  if (!internship) {
    const error = new Error("Internship not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    success: true,
    internship,
  };
};

export const getAllInternships = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category,
    workMode,
    experience,
    sort = "latest",
  } = query;

  const filter = {
    status: "Open",
    isActive: true,
  };

  // Search
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        skillsRequired: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Filters
  if (category) {
    filter.category = category;
  }

  if (workMode) {
    filter.workMode = workMode;
  }

  if (experience) {
    filter.experience = experience;
  }

  // Sorting
  let sortOption = {};

  switch (sort) {
    case "stipend":
      sortOption = { stipend: -1 };
      break;

    case "oldest":
      sortOption = { createdAt: 1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }

  const totalResults = await Internship.countDocuments(filter);

  const internships = await Internship.find(filter)
    .populate({
      path: "recruiter",
      select: "companyName companyLogo location",
    })
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return {
    success: true,
    page: Number(page),
    limit: Number(limit),
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    internships,
  };
};
