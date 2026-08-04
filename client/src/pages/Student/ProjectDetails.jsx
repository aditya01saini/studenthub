import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaHeart,
  FaBookmark,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  getProjectById,
  deleteStudentProject,
} from "../../services/student.service";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(projectId);

        if (data.success) {
          setProject(data.project);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleDeleteProject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      const data = await deleteStudentProject(projectId);

      if (data.success) {
        navigate("/student/projects");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => navigate("/student/projects")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Projects
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/student/projects")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
      >
        <FaArrowLeft />
        Back to Projects
      </button>

      {/* Main Project Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Main Image */}
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-[380px] w-full object-cover"
          />
        )}

        <div className="p-8">
          {/* Category + Status */}
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
              {project.category}
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
              {project.projectStatus || "Completed"}
            </span>
          </div>

          {/* Title */}
          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold text-slate-900">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(`/student/projects/${projectId}/edit`)}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:opacity-50"
              >
                <FaEdit />
                Edit Project
              </button>

              <button
                type="button"
                onClick={handleDeleteProject}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaTrash />
                {deleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <FaEye />
              {project.viewsCount ?? 0} views
            </span>

            <span className="flex items-center gap-2">
              <FaHeart />
              {project.likesCount ?? 0} likes
            </span>

            <span className="flex items-center gap-2">
              <FaBookmark />
              {project.bookmarksCount ?? 0} bookmarks
            </span>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">
              About this project
            </h2>

            <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-900">
                Technologies Used
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <FaGithub />
                View GitHub
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <FaExternalLinkAlt />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Images */}
      {project.images?.length > 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Project Gallery</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.images.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-64 w-full rounded-xl border border-slate-200 object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Creator */}
      {project.uploadedBy && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Created By
          </p>

          <div className="mt-4 flex items-center gap-4">
            {project.uploadedBy.profileImage ? (
              <img
                src={project.uploadedBy.profileImage}
                alt={project.uploadedBy.user?.fullName || "Student"}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                {project.uploadedBy.user?.fullName?.charAt(0)?.toUpperCase() ||
                  "S"}
              </div>
            )}

            <div>
              <h3 className="font-bold text-slate-900">
                {project.uploadedBy.user?.fullName || "Student"}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {project.uploadedBy.course || "Student"}
                {project.uploadedBy.college
                  ? ` • ${project.uploadedBy.college}`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
