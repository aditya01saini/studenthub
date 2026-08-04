import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaPlus, FaEye, FaHeart, FaGithub } from "react-icons/fa";

import { getMyProjects } from "../../services/student.service";
const StudentProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProjects();

        console.log("My Projects:", data);

        if (data.success) {
          setProjects(data.projects || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Portfolio
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Projects
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and showcase the projects you have built.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/projects/new")}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <FaPlus />
          Add Project
        </button>
      </div>

      {/* Projects */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Thumbnail */}
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-slate-100 text-4xl text-slate-400">
                  <FaFolderOpen />
                </div>
              )}

              <div className="p-5">
                {/* Category */}
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  {project.category}
                </span>

                {/* Title */}
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="mt-5 flex items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <FaEye />
                    {project.viewsCount ?? 0}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaHeart />
                    {project.likesCount ?? 0}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/student/projects/${project._id}`)}
                    className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View Project
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border border-slate-300 px-4 text-slate-600 transition hover:bg-slate-50"
                      title="GitHub Repository"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">
              <FaFolderOpen />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No projects yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add your projects to showcase your skills and work to recruiters
              and other students.
            </p>

            <button
              type="button"
              onClick={() => navigate("/student/projects/new")}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Add Your First Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
