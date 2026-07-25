import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import Project from "../models/Project.js";
import Note from "../models/Note.js";
import Internship from "../models/Internship.js";

export const globalSearch = async (query) => {
  const search = query?.trim() || "";

  if (!search) {
    const error = new Error("Search query is required.");
    error.statusCode = 400;
    throw error;
  }

  const regex = new RegExp(search, "i");

  // Find student users by full name
  const matchedUsers = await User.find({
    role: "student",
    fullName: regex,
  }).select("_id");

  const userIds = matchedUsers.map((user) => user._id);

  // Search all resources in parallel
  const [students, projects, notes, internships] =
    await Promise.all([
      StudentProfile.find({
        $or: [
          { user: { $in: userIds } },
          { college: regex },
          { course: regex },
          { skills: regex },
        ],
      })
        .populate("user", "fullName isVerified")
        .select(
          "user college course skills profileImage bio followersCount followingCount",
        )
        .limit(5),

      Project.find({
        isActive: true,
        $or: [
          { title: regex },
          { description: regex },
          { techStack: regex },
        ],
      })
        .populate({
          path: "uploadedBy",
          select: "user profileImage",
          populate: {
            path: "user",
            select: "fullName isVerified",
          },
        })
        .select(
          "title category techStack thumbnail viewsCount bookmarksCount uploadedBy",
        )
        .sort({ createdAt: -1 })
        .limit(5),

      Note.find({
        isActive: true,
        $or: [
          { title: regex },
          { subject: regex },
          { branch: regex },
          { university: regex },
          { tags: regex },
        ],
      })
        .populate({
          path: "uploadedBy",
          select: "user profileImage",
          populate: {
            path: "user",
            select: "fullName isVerified",
          },
        })
        .select(
          "title subject branch university semester thumbnail downloadsCount viewsCount uploadedBy",
        )
        .sort({ createdAt: -1 })
        .limit(5),

      Internship.find({
        status: "Open",
        isActive: true,
        $or: [
          { title: regex },
          { description: regex },
          { skillsRequired: regex },
        ],
      })
        .populate(
          "recruiter",
          "companyName companyLogo location",
        )
        .select(
          "title category workMode location stipend skillsRequired applicationDeadline recruiter",
        )
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

  return {
    success: true,
    query: search,

    counts: {
      students: students.length,
      projects: projects.length,
      notes: notes.length,
      internships: internships.length,
    },

    results: {
      students,
      projects,
      notes,
      internships,
    },
  };
};