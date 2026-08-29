import React, { useState } from "react";
import {
  Sparkles,
  FileText,
  Target,
  Briefcase,
  GraduationCap,
  Code2,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";

import resumeAnalysisService from "../../../services/resumeAnalysis.service";

// ======================================================
// SCORE CARD
// ======================================================

const ScoreCard = ({ title, score, icon: Icon }) => {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>

          <span className="font-medium text-slate-700">{title}</span>
        </div>

        <span className="text-2xl font-bold text-slate-900">{safeScore}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-700"
          style={{ width: `${safeScore}%` }}
        />
      </div>
    </div>
  );
};

// ======================================================
// LIST SECTION
// ======================================================

const ListSection = ({ title, items, icon: Icon, variant = "default" }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const getItemText = (item) => {
    if (typeof item === "string") {
      return item;
    }

    if (typeof item === "object" && item !== null) {
      return (
        item.text ||
        item.description ||
        item.name ||
        item.title ||
        item.message ||
        JSON.stringify(item)
      );
    }

    return String(item);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`rounded-xl p-3 ${
            variant === "danger"
              ? "bg-red-50"
              : variant === "success"
                ? "bg-green-50"
                : "bg-indigo-50"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              variant === "danger"
                ? "text-red-600"
                : variant === "success"
                  ? "text-green-600"
                  : "text-indigo-600"
            }`}
          />
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const text = getItemText(item);

          return (
            <div
              key={index}
              className={`flex items-start gap-3 rounded-xl p-3 ${
                variant === "danger"
                  ? "bg-red-50"
                  : variant === "success"
                    ? "bg-green-50"
                    : "bg-slate-50"
              }`}
            >
              {variant === "danger" ? (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
              )}

              <p className="text-sm leading-6 text-slate-700">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ======================================================
// KEYWORD SECTION
// ======================================================

const KeywordSection = ({ title, keywords, type = "found" }) => {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`rounded-xl p-3 ${
            type === "missing" ? "bg-red-50" : "bg-green-50"
          }`}
        >
          {type === "missing" ? (
            <AlertCircle className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => {
          const value =
            typeof keyword === "string"
              ? keyword
              : keyword?.name || keyword?.keyword || keyword?.text || "";

          return (
            <span
              key={index}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                type === "missing"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {value}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ======================================================
// MAIN COMPONENT
// ======================================================

const ResumeAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // ====================================================
  // ANALYZE RESUME
  // ====================================================

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await resumeAnalysisService.analyzeResume();

      const result =
        response?.analysis ||
        response?.data?.analysis ||
        response?.data ||
        response;

      if (!result) {
        throw new Error("No analysis result received.");
      }

      setAnalysis(result);
    } catch (err) {
      console.error("Resume analysis error:", err);

      const status = err?.response?.status;

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;

      if (status === 401) {
        setError("Please login to analyze your resume.");
      } else if (status === 400) {
        setError(
          message ||
            "Please upload your resume from your Student Profile before analyzing.",
        );
      } else if (status === 404) {
        setError(message || "Student profile or resume was not found.");
      } else {
        setError(message || "Unable to analyze your resume. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // RESET
  // ====================================================

  const handleReset = () => {
    setAnalysis(null);
    setError("");
  };

  // ====================================================
  // ANALYSIS DATA
  // ====================================================

  const overallScore =
    analysis?.overallScore ?? analysis?.overall_score ?? analysis?.score ?? 0;

  const atsScore =
    analysis?.atsScore ?? analysis?.ats_score ?? analysis?.ats ?? 0;

  const skillsScore =
    analysis?.skillsScore ??
    analysis?.skills_score ??
    analysis?.skills?.score ??
    0;

  const experienceScore =
    analysis?.experienceScore ??
    analysis?.experience_score ??
    analysis?.experience?.score ??
    0;

  const educationScore =
    analysis?.educationScore ??
    analysis?.education_score ??
    analysis?.education?.score ??
    0;

  const projectsScore =
    analysis?.projectsScore ??
    analysis?.projects_score ??
    analysis?.projects?.score ??
    0;

  const completenessScore =
    analysis?.completenessScore ??
    analysis?.completeness_score ??
    analysis?.completeness ??
    0;

  const strengths =
    analysis?.strengths || analysis?.strengthsAndWeaknesses?.strengths || [];

  const weaknesses =
    analysis?.weaknesses || analysis?.strengthsAndWeaknesses?.weaknesses || [];

  const missingSkills =
    analysis?.missingSkills ||
    analysis?.missing_skills ||
    analysis?.skills?.missing ||
    [];

  const recommendedRoles =
    analysis?.recommendedRoles || analysis?.recommended_roles || [];

  const suggestions =
    analysis?.suggestions ||
    analysis?.improvements ||
    analysis?.recommendations ||
    [];

  const foundKeywords =
    analysis?.foundKeywords || analysis?.found_keywords || [];

  const missingKeywords =
    analysis?.missingKeywords || analysis?.missing_keywords || [];

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="resume-analyzer"
      className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white py-20"
    >
      {/* Background Decoration */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Analyzer
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Make Your Resume
            <span className="text-indigo-600"> Recruiter Ready</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Get an AI-powered analysis of your resume with ATS scoring, skill
            insights, strengths, weaknesses and personalized recommendations.
          </p>
        </div>

        {/* ==================================================
            BEFORE ANALYSIS
        ================================================== */}

        {!analysis && (
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12">
              {/* Icon */}

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50">
                <FileText className="h-9 w-9 text-indigo-600" />
              </div>

              <div className="mx-auto mt-6 max-w-2xl text-center">
                <h3 className="text-2xl font-bold text-slate-900">
                  Analyze Your Existing Resume
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  Your resume from your StudentHub profile will be analyzed
                  using AI. No need to upload the file again.
                </p>
              </div>

              {/* Analyze Button */}

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Analyze My Resume
                    </>
                  )}
                </button>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
              </div>

              {/* Error */}

              {error && (
                <div className="mx-auto mt-7 flex max-w-2xl items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                  <div>
                    <p className="font-medium text-red-800">
                      Unable to analyze resume
                    </p>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ==================================================
                BENEFITS
            ================================================== */}

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <Target className="mx-auto h-7 w-7 text-indigo-600" />

                <h4 className="mt-4 font-semibold text-slate-900">ATS Score</h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Find out how well your resume performs with applicant tracking
                  systems.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <Code2 className="mx-auto h-7 w-7 text-indigo-600" />

                <h4 className="mt-4 font-semibold text-slate-900">
                  Skill Analysis
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Identify your strengths and discover skills you should add.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <Lightbulb className="mx-auto h-7 w-7 text-indigo-600" />

                <h4 className="mt-4 font-semibold text-slate-900">
                  AI Recommendations
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Get practical suggestions to improve your resume.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            ANALYSIS RESULT
        ================================================== */}

        {analysis && (
          <div className="space-y-8">
            {/* Result Header */}

            <div className="rounded-3xl bg-indigo-600 p-7 text-white shadow-xl sm:p-9">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-indigo-100">
                    <Sparkles className="h-5 w-5" />
                    AI Resume Analysis
                  </div>

                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Your Resume Analysis is Ready
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                    Review your scores and use the recommendations below to make
                    your resume stronger.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  <RefreshCw className="h-5 w-5" />
                  Analyze Again
                </button>
              </div>
            </div>

            {/* ==================================================
                SCORE AREA
            ================================================== */}

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Overall Score */}

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    Overall Resume Score
                  </p>

                  <div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-indigo-100">
                    <div>
                      <div className="text-5xl font-bold text-indigo-600">
                        {overallScore}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">/ 100</div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {overallScore >= 80
                      ? "Excellent! Your resume is in strong shape."
                      : overallScore >= 60
                        ? "Good foundation. A few improvements can make it stronger."
                        : "Your resume needs some improvements before applying."}
                  </p>
                </div>
              </div>

              {/* Individual Scores */}

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                <ScoreCard title="ATS Score" score={atsScore} icon={Target} />

                <ScoreCard title="Skills" score={skillsScore} icon={Code2} />

                <ScoreCard
                  title="Experience"
                  score={experienceScore}
                  icon={Briefcase}
                />

                <ScoreCard
                  title="Education"
                  score={educationScore}
                  icon={GraduationCap}
                />

                <ScoreCard
                  title="Projects"
                  score={projectsScore}
                  icon={Code2}
                />

                <ScoreCard
                  title="Completeness"
                  score={completenessScore}
                  icon={CheckCircle2}
                />
              </div>
            </div>

            {/* ==================================================
                STRENGTHS / WEAKNESSES
            ================================================== */}

            <div className="grid gap-6 lg:grid-cols-2">
              <ListSection
                title="Strengths"
                items={strengths}
                icon={CheckCircle2}
                variant="success"
              />

              <ListSection
                title="Areas to Improve"
                items={weaknesses}
                icon={AlertCircle}
                variant="danger"
              />
            </div>

            {/* ==================================================
                SKILLS / ROLES
            ================================================== */}

            <div className="grid gap-6 lg:grid-cols-2">
              <ListSection
                title="Missing Skills"
                items={missingSkills}
                icon={Code2}
                variant="danger"
              />

              <ListSection
                title="Recommended Roles"
                items={recommendedRoles}
                icon={Briefcase}
                variant="success"
              />
            </div>

            {/* ==================================================
                KEYWORDS
            ================================================== */}

            {(foundKeywords.length > 0 || missingKeywords.length > 0) && (
              <div className="grid gap-6 lg:grid-cols-2">
                <KeywordSection
                  title="Keywords Found"
                  keywords={foundKeywords}
                  type="found"
                />

                <KeywordSection
                  title="Missing Keywords"
                  keywords={missingKeywords}
                  type="missing"
                />
              </div>
            )}

            {/* ==================================================
                AI SUGGESTIONS
            ================================================== */}

            <ListSection
              title="AI Improvement Suggestions"
              items={suggestions}
              icon={Lightbulb}
              variant="default"
            />

            {/* ==================================================
                BOTTOM CTA
            ================================================== */}

            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-7 text-center sm:p-9">
              <Sparkles className="mx-auto h-8 w-8 text-indigo-600" />

              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                Ready to improve your resume?
              </h3>

              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Apply the AI recommendations, update your resume from your
                StudentHub profile and analyze it again.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                <RefreshCw className="h-5 w-5" />
                Analyze Updated Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeAnalyzer;
