import { useNavigate } from "react-router-dom";

import {
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaHeart,
  FaUser,
  FaCode,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import Button from "./Button";

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

const ProjectCard = ({
  _id,
  title,
  description,
  category,
  techStack = [],
  thumbnail,
  githubUrl,
  liveDemoUrl,
  viewsCount = 0,
  likesCount = 0,
  uploadedBy,
  featured = false,
  projectStatus = "Completed",
}) => {
  const navigate = useNavigate();

  const studentName =
    uploadedBy?.user?.fullName || uploadedBy?.fullName || "Student";

  const studentImage = uploadedBy?.profileImage || "";

  const isCompleted = projectStatus === "Completed";

  // ==========================================
  // VIEW PROJECT
  // ==========================================

  const handleViewProject = () => {
    if (_id) {
      navigate(`/projects/${_id}`);
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
      {/* ==========================================
          PROJECT IMAGE
      ========================================== */}

      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-md">
              <FaCode className="text-2xl" />
            </div>
          </div>
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

        {/* Featured */}

        {featured && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-indigo-700 shadow-md backdrop-blur">
              <span>★</span>
              Featured
            </span>
          </div>
        )}

        {/* Status */}

        <div className="absolute right-3 top-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-md backdrop-blur ${
              isCompleted
                ? "border-emerald-200 bg-emerald-50/95 text-emerald-700"
                : "border-amber-200 bg-amber-50/95 text-amber-700"
            }`}
          >
            {isCompleted ? <FaCheckCircle /> : <FaClock />}
            {projectStatus}
          </span>
        </div>

        {/* Category */}

        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-slate-900/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {category || "Project"}
          </span>
        </div>
      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="flex flex-1 flex-col p-5">
        {/* Title */}

        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-indigo-600">
          {title}
        </h3>

        {/* Student */}

        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-indigo-600">
            {studentImage ? (
              <img
                src={studentImage}
                alt={studentName}
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUser className="text-xs" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800">
              {studentName}
            </p>

            <p className="text-[11px] text-slate-400">Student Project</p>
          </div>
        </div>

        {/* Description */}

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-5 text-slate-600">
          {description}
        </p>

        {/* Tech Stack */}

        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techStack.slice(0, 3).map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${
                  colors[tech] || "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {tech}
              </span>
            ))}

            {techStack.length > 3 && (
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Divider */}

        <div className="my-4 border-t border-slate-100" />

        {/* Stats */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <FaEye className="text-indigo-500" />
              {Number(viewsCount).toLocaleString("en-IN")}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <FaHeart className="text-rose-500" />
              {Number(likesCount).toLocaleString("en-IN")}
            </span>
          </div>

          <span className="text-[11px] font-medium text-slate-400">
            {techStack.length} tech
          </span>
        </div>

        {/* View Project */}

        <button
          type="button"
          onClick={handleViewProject}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
        >
          View Project
          <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* GitHub + Live Demo */}

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {/* GitHub */}

          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full justify-center text-xs">
                <FaGithub className="mr-1.5" />
                GitHub
              </Button>
            </a>
          ) : (
            <Button
              disabled
              className="w-full justify-center text-xs opacity-40"
            >
              <FaGithub className="mr-1.5" />
              GitHub
            </Button>
          )}

          {/* Live Demo */}

          {liveDemoUrl ? (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="secondary"
                className="w-full justify-center text-xs"
              >
                <FaExternalLinkAlt className="mr-1.5" />
                Live Demo
              </Button>
            </a>
          ) : (
            <Button
              variant="secondary"
              disabled
              className="w-full justify-center text-xs opacity-40"
            >
              <FaExternalLinkAlt className="mr-1.5" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
