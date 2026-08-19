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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl">
      {/* ==========================================
          PROJECT IMAGE
      ========================================== */}

      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-indigo-500 shadow-lg">
              <FaCode className="text-3xl" />
            </div>
          </div>
        )}

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* ==========================================
            FEATURED
        ========================================== */}

        {featured && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-lg backdrop-blur-md">
              <span className="text-sm">★</span>
              Featured
            </span>
          </div>
        )}

        {/* ==========================================
            STATUS
        ========================================== */}

        <div className="absolute right-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md ${
              isCompleted
                ? "border-emerald-200 bg-emerald-50/95 text-emerald-700"
                : "border-amber-200 bg-amber-50/95 text-amber-700"
            }`}
          >
            {isCompleted ? <FaCheckCircle /> : <FaClock />}

            {projectStatus}
          </span>
        </div>

        {/* ==========================================
            CATEGORY
        ========================================== */}

        <div className="absolute bottom-4 left-4">
          <span className="rounded-lg bg-slate-900/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            {category || "Project"}
          </span>
        </div>
      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="flex flex-1 flex-col p-6">
        {/* ==========================================
            TITLE
        ========================================== */}

        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-indigo-600">
          {title}
        </h3>

        {/* ==========================================
            STUDENT
        ========================================== */}

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-indigo-600">
            {studentImage ? (
              <img
                src={studentImage}
                alt={studentName}
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUser className="text-sm" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {studentName}
            </p>

            <p className="text-xs text-slate-400">Student Project</p>
          </div>
        </div>

        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
          {description}
        </p>

        {/* ==========================================
            TECH STACK
        ========================================== */}

        {techStack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                  colors[tech] || "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {tech}
              </span>
            ))}

            {techStack.length > 4 && (
              <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* ==========================================
            DIVIDER
        ========================================== */}

        <div className="my-5 border-t border-slate-100" />

        {/* ==========================================
            STATS
        ========================================== */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <FaEye className="text-indigo-500" />

              {Number(viewsCount).toLocaleString("en-IN")}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <FaHeart className="text-rose-500" />

              {Number(likesCount).toLocaleString("en-IN")}
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {techStack.length} technologies
          </span>
        </div>

        {/* ==========================================
            VIEW PROJECT
        ========================================== */}

        <button
          type="button"
          onClick={handleViewProject}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
        >
          View Project
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        {/* ==========================================
            GITHUB + LIVE DEMO
        ========================================== */}

        <div className="mt-3 grid grid-cols-2 gap-3">
          {/* GitHub */}

          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full justify-center">
                <FaGithub className="mr-2" />
                GitHub
              </Button>
            </a>
          ) : (
            <Button disabled className="w-full justify-center opacity-40">
              <FaGithub className="mr-2" />
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
              <Button variant="secondary" className="w-full justify-center">
                <FaExternalLinkAlt className="mr-2" />
                Live Demo
              </Button>
            </a>
          ) : (
            <Button
              variant="secondary"
              disabled
              className="w-full justify-center opacity-40"
            >
              <FaExternalLinkAlt className="mr-2" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
