import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaHeart,
  FaUser,
  FaCode,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

import Container from "../../components/ui/Container";
import api from "../../services/api";

const colors = {
  React: "bg-blue-50 text-blue-700 border-blue-100",
  "Node.js": "bg-green-50 text-green-700 border-green-100",
  MongoDB: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Express: "bg-slate-100 text-slate-700 border-slate-200",
  Tailwind: "bg-cyan-50 text-cyan-700 border-cyan-100",
  "Tailwind CSS": "bg-cyan-50 text-cyan-700 border-cyan-100",
  JavaScript: "bg-yellow-50 text-yellow-700 border-yellow-100",
  TypeScript: "bg-blue-50 text-blue-700 border-blue-100",
  Python: "bg-indigo-50 text-indigo-700 border-indigo-100",
  API: "bg-orange-50 text-orange-700 border-orange-100",
  JWT: "bg-purple-50 text-purple-700 border-purple-100",
  MERN: "bg-pink-50 text-pink-700 border-pink-100",
};

const PublicProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PROJECT
  // ==========================================

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/projects/${projectId}`);

      setProject(data.project || data);
    } catch (error) {
      console.error("Failed to fetch project:", error);

      setError(error?.response?.data?.message || "Unable to load project.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <Container>
          <div className="animate-pulse">
            <div className="h-6 w-24 rounded bg-slate-200" />

            <div className="mt-6 h-72 rounded-3xl bg-slate-200" />

            <div className="mt-6 h-10 w-2/3 rounded bg-slate-200" />

            <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />
          </div>
        </Container>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FaCode className="text-2xl" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Project Not Found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error || "This project is no longer available."}
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const uploadedBy = project.uploadedBy;

  const studentName =
    uploadedBy?.user?.fullName || uploadedBy?.fullName || "Student";

  const studentImage = uploadedBy?.profileImage || "";

  const studentId = uploadedBy?._id || uploadedBy?.user?._id;

  const isCompleted = project.projectStatus === "Completed";

  const images =
    project.images?.length > 0
      ? project.images
      : project.thumbnail
        ? [project.thumbnail]
        : [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <Container>
        {/* ==========================================
            BACK
        ========================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-x-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <FaArrowLeft className="text-xs transition group-hover:-translate-x-0.5" />
          Back to Projects
        </button>

        {/* ==========================================
            PROJECT HERO
        ========================================== */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Main Image */}

          <div className="relative h-72 overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 sm:h-96">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <FaCode className="text-7xl text-indigo-200" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* Featured */}

            {project.featured && (
              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-indigo-700 shadow-lg backdrop-blur">
                  ★ Featured Project
                </span>
              </div>
            )}

            {/* Status */}

            <div className="absolute right-5 top-5">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {isCompleted ? <FaCheckCircle /> : <FaClock />}

                {project.projectStatus}
              </span>
            </div>

            {/* Bottom Info */}

            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-lg bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                {project.category}
              </span>

              <h1 className="mt-3 max-w-4xl text-3xl font-bold text-white sm:text-4xl">
                {project.title}
              </h1>
            </div>
          </div>

          {/* ==========================================
              PROJECT CONTENT
          ========================================== */}

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Student */}

            <div className="flex flex-col gap-5 border-b border-slate-100 pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-indigo-600">
                  {studentImage ? (
                    <img
                      src={studentImage}
                      alt={studentName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser />
                  )}
                </div>

                <div>
                  <p className="text-xs text-slate-400">Created by</p>

                  {studentId ? (
                    <Link
                      to={`/students/${studentId}`}
                      className="font-semibold text-slate-900 transition hover:text-indigo-600"
                    >
                      {studentName}
                    </Link>
                  ) : (
                    <p className="font-semibold text-slate-900">
                      {studentName}
                    </p>
                  )}

                  {uploadedBy?.college && (
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <FaGraduationCap />
                      {uploadedBy.college}
                    </p>
                  )}
                </div>
              </div>

              {/* Stats */}

              <div className="flex gap-5">
                <Stat
                  icon={<FaEye />}
                  value={project.viewsCount}
                  label="Views"
                />

                <Stat
                  icon={<FaHeart />}
                  value={project.likesCount}
                  label="Likes"
                />
              </div>
            </div>

            {/* ==========================================
                DESCRIPTION
            ========================================== */}

            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-900">
                About This Project
              </h2>

              <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-7 text-slate-600">
                {project.description}
              </p>
            </div>

            {/* ==========================================
                TECH STACK
            ========================================== */}

            {project.techStack?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Technologies Used
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={`${tech}-${index}`}
                      className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                        colors[tech] ||
                        "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                PROJECT SCREENSHOTS
            ========================================== */}

            {images.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">
                  Project Screenshots
                </h2>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                ACTIONS
            ========================================== */}

            <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:flex-1"
                >
                  <Button className="w-full justify-center">
                    <FaGithub className="mr-2" />
                    View on GitHub
                  </Button>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:flex-1"
                >
                  <Button variant="secondary" className="w-full justify-center">
                    <FaExternalLinkAlt className="mr-2" />
                    Open Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

// ==========================================
// STAT
// ==========================================

const Stat = ({ icon, value, label }) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-slate-800">
        <span className="text-indigo-500">{icon}</span>

        {Number(value || 0).toLocaleString("en-IN")}
      </div>

      <p className="mt-1 text-[11px] text-slate-400">{label}</p>
    </div>
  );
};

export default PublicProjectDetails;
