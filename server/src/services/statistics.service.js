import StudentProfile from "../models/StudentProfile.js";
import Note from "../models/Note.js";
import Project from "../models/Project.js";
import Internship from "../models/Internship.js";

export const getStatistics = async () => {
  const [students, notes, projects, internships] = await Promise.all([
    StudentProfile.countDocuments(),

    Note.countDocuments({
      isActive: true,
    }),

    Project.countDocuments({
      isActive: true,
    }),

    Internship.countDocuments({
      isActive: true,
      status: "Open",
    }),
  ]);

  return {
    success: true,
    statistics: {
      students,
      notes,
      projects,
      internships,
    },
  };
};
