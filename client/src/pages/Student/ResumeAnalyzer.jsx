import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaBriefcase,
  FaCode,
  FaFilePdf,
  FaRedo,
  FaStar,
  FaBullseye,
  FaGraduationCap,
  FaProjectDiagram,
  FaUserCheck,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaSpinner,
  FaUpload,
} from "react-icons/fa";

import api from "../../services/api";

/* =========================================================
   SCORE CARD
========================================================= */

const ScoreCard = ({ label, score, icon }) => {
  const safeScore = Number(score) || 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Score
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {safeScore}
            <span className="text-base font-semibold text-slate-400">
              /100
            </span>
          </p>
        </div>

        <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${Math.min(safeScore, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SECTION CARD
========================================================= */

const SectionAnalysisCard = ({ title, data }) => {
  const [open, setOpen] = useState(false);

  const score = Number(data?.score) || 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              score >= 75
                ? "bg-emerald-50 text-emerald-600"
                : score >= 50
                  ? "bg-amber-50 text-amber-600"
                  : "bg-red-50 text-red-600"
            }`}
          >
            {score >= 75 ? (
              <FaCheckCircle />
            ) : (
              <FaExclamationTriangle />
            )}
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-bold capitalize text-slate-800">
              {title}
            </h4>

            <p className="mt-1 text-xs text-slate-500">
              Section score: {score}/100
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="text-lg font-extrabold text-slate-800">
            {score}
          </span>

          {open ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
          <p className="text-sm leading-7 text-slate-600">
            {data?.feedback || "No feedback available."}
          </p>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   TAG LIST
========================================================= */

const TagList = ({
  items,
  type = "default",
  emptyText = "No data available",
}) => {
  if (!items?.length) {
    return (
      <p className="text-sm text-slate-500">
        {emptyText}
      </p>
    );
  }

  const styles = {
    default:
      "border-slate-200 bg-slate-50 text-slate-700",
    success:
      "border-emerald-100 bg-emerald-50 text-emerald-700",
    warning:
      "border-amber-100 bg-amber-50 text-amber-700",
    danger:
      "border-red-100 bg-red-50 text-red-700",
    purple:
      "border-purple-100 bg-purple-50 text-purple-700",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
            styles[type]
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

/* =========================================================
   INFO LIST
========================================================= */

const InfoList = ({ items, icon, emptyText }) => {
  if (!items?.length) {
    return (
      <p className="text-sm text-slate-500">
        {emptyText || "No information available."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
        >
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-indigo-600 shadow-sm">
            {icon}
          </div>

          <p className="text-sm leading-6 text-slate-600">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ResumeAnalyzer = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  /* =======================================================
     FILE VALIDATION
  ======================================================= */

  const validateFile = (selectedFile) => {
    setError("");

    if (!selectedFile) {
      return false;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF resume only.");
      return false;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Resume size must be less than 10 MB.");
      return false;
    }

    return true;
  };

  /* =======================================================
     FILE SELECT
  ======================================================= */

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  /* =======================================================
     DRAG & DROP
  ======================================================= */

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      setResult(null);
    }
  };

  /* =======================================================
     ANALYZE
  ======================================================= */

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("resume", file);

      const response = await api.post(
        "/ai/analyze-guest",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data?.success) {
        setResult(response.data.analysis);
      } else {
        setError(
          response.data?.message ||
            "Unable to analyze your resume.",
        );
      }
    } catch (err) {
      console.error("Resume Analysis Error:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong while analyzing your resume.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  /* =======================================================
     RESULT VIEW
  ======================================================= */

  if (result) {
    const overallScore = Number(result.resumeScore) || 0;
    const keywordScore =
      Number(result.keywordMatchPercentage) || 0;

    return (
      <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
              >
                <FaArrowLeft />
                Back to Home
              </button>

              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                Resume Intelligence
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Resume Analysis Report
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                AI-powered insights to help you improve your resume.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
            >
              <FaRedo />
              Analyze Another
            </button>
          </div>

          {/* =================================================
              HERO SCORE
          ================================================= */}

          <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 p-6 text-white shadow-xl sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <FaFilePdf className="text-xl" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
                      Analyzed Resume
                    </p>

                    <p className="mt-1 max-w-xs truncate text-sm font-bold sm:max-w-md">
                      {file?.name || "Resume"}
                    </p>
                  </div>
                </div>

                <h2 className="mt-7 text-2xl font-extrabold sm:text-3xl">
                  Your resume is on the right track.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                  Review the insights below to improve ATS compatibility,
                  technical skills, experience descriptions and overall
                  resume quality.
                </p>
              </div>

              {/* SCORE */}

              <div className="flex shrink-0 justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-white/20">
                  <div
                    className="absolute inset-[-12px] rounded-full border-[12px] border-transparent"
                    style={{
                      borderTopColor: "white",
                      borderRightColor:
                        overallScore >= 50 ? "white" : "transparent",
                      transform: `rotate(${overallScore * 3.6}deg)`,
                    }}
                  />

                  <div className="text-center">
                    <p className="text-5xl font-black">
                      {overallScore}
                    </p>

                    <p className="text-xs font-semibold text-indigo-100">
                      OUT OF 100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SCORE GRID
          ================================================= */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <ScoreCard
              label="ATS"
              score={result.atsScore}
              icon={<FaBullseye />}
            />

            <ScoreCard
              label="Skills"
              score={result.skillsScore}
              icon={<FaCode />}
            />

            <ScoreCard
              label="Experience"
              score={result.experienceScore}
              icon={<FaBriefcase />}
            />

            <ScoreCard
              label="Education"
              score={result.educationScore}
              icon={<FaGraduationCap />}
            />

            <ScoreCard
              label="Projects"
              score={result.projectsScore}
              icon={<FaProjectDiagram />}
            />

            <ScoreCard
              label="Complete"
              score={result.completenessScore}
              icon={<FaUserCheck />}
            />
          </div>

          {/* =================================================
              KEYWORD MATCH
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <FaChartLine />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Keyword Match
                    </h3>

                    <p className="text-xs text-slate-500">
                      How well your resume matches relevant job keywords
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-3xl font-extrabold text-indigo-600">
                {keywordScore}%
              </p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700"
                style={{
                  width: `${Math.min(keywordScore, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* =================================================
              SKILLS
          ================================================= */}

          <div className="mb-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaCheckCircle />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Skills Detected
                  </h3>

                  <p className="text-xs text-slate-500">
                    Skills found in your resume
                  </p>
                </div>
              </div>

              <TagList
                items={result.skills}
                type="success"
                emptyText="No skills detected."
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FaExclamationTriangle />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Skills to Consider
                  </h3>

                  <p className="text-xs text-slate-500">
                    Relevant skills missing from your resume
                  </p>
                </div>
              </div>

              <TagList
                items={result.missingSkills}
                type="warning"
                emptyText="No major missing skills identified."
              />
            </div>
          </div>

          {/* =================================================
              STRENGTHS + WEAKNESSES
          ================================================= */}

          <div className="mb-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaStar />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Key Strengths
                  </h3>

                  <p className="text-xs text-slate-500">
                    What your resume does well
                  </p>
                </div>
              </div>

              <InfoList
                items={result.strengths}
                icon={<FaCheckCircle />}
                emptyText="No strengths available."
              />
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <FaExclamationTriangle />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Areas to Improve
                  </h3>

                  <p className="text-xs text-slate-500">
                    Issues that may reduce your resume impact
                  </p>
                </div>
              </div>

              <InfoList
                items={result.weaknesses}
                icon={<FaExclamationTriangle />}
                emptyText="No major weaknesses identified."
              />
            </div>
          </div>

          {/* =================================================
              RECOMMENDED ROLES
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaBriefcase />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Recommended Roles
                </h3>

                <p className="text-xs text-slate-500">
                  Roles that align with your current profile
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.recommendedRoles?.map((role, index) => (
                <div
                  key={`${role}-${index}`}
                  className="group rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                      {index + 1}
                    </div>

                    <p className="text-sm font-bold text-slate-700 transition group-hover:text-indigo-700">
                      {role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              SUGGESTIONS
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaLightbulb />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  AI Recommendations
                </h3>

                <p className="text-xs text-slate-500">
                  Practical changes that can improve your resume
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {result.suggestions?.map((suggestion, index) => (
                <div
                  key={`${suggestion}-${index}`}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              SECTION ANALYSIS
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-slate-900">
                Section-by-Section Analysis
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Detailed feedback for each important resume section.
              </p>
            </div>

            <div className="space-y-3">
              {result.sectionAnalysis &&
                Object.entries(result.sectionAnalysis).map(
                  ([title, data]) => (
                    <SectionAnalysisCard
                      key={title}
                      title={title}
                      data={data}
                    />
                  ),
                )}
            </div>
          </div>

          {/* =================================================
              IMPROVEMENT PRIORITY
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-slate-900">
                Improvement Priority
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Focus on these areas first for the biggest impact.
              </p>
            </div>

            <div className="space-y-4">
              {result.improvementPriority?.map((item, index) => {
                const priority = item?.priority || "Medium";

                const priorityStyle =
                  priority === "High"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : priority === "Medium"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700";

                return (
                  <div
                    key={`${item.area}-${index}`}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <span
                        className={`w-fit rounded-lg border px-3 py-1 text-xs font-bold ${priorityStyle}`}
                      >
                        {priority} Priority
                      </span>

                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">
                          {item.area}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              KEYWORDS
          ================================================= */}

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Keywords Found
              </h3>

              <p className="mt-1 mb-5 text-xs text-slate-500">
                Keywords currently detected in your resume.
              </p>

              <TagList
                items={result.keywordsFound}
                type="purple"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Keywords Missing
              </h3>

              <p className="mt-1 mb-5 text-xs text-slate-500">
                Consider adding these where they genuinely match your
                experience.
              </p>

              <TagList
                items={result.keywordsMissing}
                type="warning"
              />
            </div>
          </div>

          {/* FOOTER */}

          <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-center">
            <p className="text-sm font-bold text-indigo-900">
              Keep improving your resume 🚀
            </p>

            <p className="mt-1 text-xs text-indigo-700">
              Use the recommendations above to create a stronger,
              ATS-friendly resume.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     UPLOAD VIEW
  ========================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-7 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Home
        </button>

        {/* HEADER */}

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600 shadow-sm">
            <FaFilePdf />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-indigo-600">
            StudentHub AI
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            AI Resume Analyzer
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Upload your resume and get professional AI-powered insights
            across ATS compatibility, skills, experience, projects and
            overall resume quality.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
            <FaCheckCircle />
            Free analysis • No login required
          </div>
        </div>

        {/* UPLOAD */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-14 ${
              dragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/30"
            }`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl text-indigo-600 shadow-sm">
              <FaUpload />
            </div>

            <h2 className="mt-6 text-xl font-extrabold text-slate-800">
              Upload your resume
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your PDF here, or choose a file from your device.
            </p>

            <label className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              <FaUpload />
              Choose Resume

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <p className="mt-4 text-xs text-slate-400">
              PDF format only • Maximum 10 MB
            </p>
          </div>

          {/* SELECTED FILE */}

          {file && (
            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
                  <FaFilePdf />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-bold text-red-500 transition hover:text-red-600"
              >
                Remove
              </button>
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              <FaExclamationTriangle className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ANALYZE */}

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <FaChartLine />
                Analyze My Resume
              </>
            )}
          </button>

          {loading && (
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center">
              <p className="text-sm font-semibold text-slate-700">
                AI is analyzing your resume...
              </p>

              <p className="mt-1 text-xs text-slate-500">
                This may take a few moments. Please don't close the page.
              </p>
            </div>
          )}
        </div>

        {/* FEATURES */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <FaBullseye className="mx-auto text-xl text-indigo-600" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              ATS Analysis
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Check how well your resume performs with ATS systems.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <FaCode className="mx-auto text-xl text-purple-600" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              Skill Analysis
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Identify your strongest skills and relevant gaps.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <FaLightbulb className="mx-auto text-xl text-amber-500" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              Smart Suggestions
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Get actionable recommendations to improve your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
