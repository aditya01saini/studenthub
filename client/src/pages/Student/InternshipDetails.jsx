import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaCalendarAlt,
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";

import {
  getStudentInternship,
  applyToInternship,
} from "../../services/student.service";

const InternshipDetails = () => {
  const navigate = useNavigate();
  const { internshipId } = useParams();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");

  // Fetch Internship
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentInternship(internshipId);

        if (data.success) {
          setInternship(data.internship);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load internship details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId]);

  // Format Date
  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format Stipend
  const formatStipend = (stipend) => {
    if (stipend === 0) {
      return "Unpaid";
    }

    return `₹${Number(stipend || 0).toLocaleString("en-IN")}/month`;
  };

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      setApplying(true);
      setApplyError("");
      setApplySuccess("");

      const data = await applyToInternship(internshipId, coverLetter.trim());

      if (data.success) {
        setApplySuccess(data.message || "Application submitted successfully.");

        setCoverLetter("");

        // Update applicant count on screen
        setInternship((prev) => ({
          ...prev,
          applicantsCount: (prev.applicantsCount || 0) + 1,
        }));
      }
    } catch (err) {
      setApplyError(
        err.response?.data?.message ||
          "Failed to submit application. Please try again.",
      );
    } finally {
      setApplying(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[450px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading internship...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/student/internships")}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  if (!internship) return null;

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/student/internships")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
      >
        <FaArrowLeft />
        Back to Internships
      </button>

      {/* ================= HEADER ================= */}

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Company Logo */}
          <div className="shrink-0">
            {internship.recruiter?.companyLogo ? (
              <img
                src={internship.recruiter.companyLogo}
                alt={internship.recruiter?.companyName || "Company"}
                className="h-16 w-16 rounded-2xl border border-slate-200 bg-white object-contain p-1.5 sm:h-20 sm:w-20"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600 sm:h-20 sm:w-20">
                <FaBuilding />
              </div>
            )}
          </div>

          {/* Main Header Content */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Company + Title */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-indigo-600">
                  {internship.recruiter?.companyName || "Company"}
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {internship.title}
                </h1>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                  {internship.category}
                </span>

                {internship.isFeatured && (
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                    Featured
                  </span>
                )}

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    internship.status === "Open"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {internship.status}
                </span>
              </div>
            </div>

            {/* Meta Information */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="shrink-0 text-slate-400" />
                {internship.location}
              </span>

              <span className="flex items-center gap-2">
                <FaBriefcase className="shrink-0 text-slate-400" />
                {internship.workMode}
              </span>

              <span className="flex items-center gap-2">
                <FaClock className="shrink-0 text-slate-400" />
                {internship.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* LEFT SIDE */}
        <div className="min-w-0 space-y-6">
          {/* About Internship */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              About the Internship
            </h2>

            <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
              {internship.description ||
                "No description provided for this internship."}
            </p>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Skills Required
            </h2>

            {internship.skillsRequired?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {internship.skillsRequired.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="max-w-full break-words rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No specific skills mentioned.
              </p>
            )}
          </section>

          {/* Perks */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Perks & Benefits
            </h2>

            {internship.perks?.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {internship.perks.map((perk, index) => (
                  <div
                    key={`${perk}-${index}`}
                    className="flex min-w-0 items-start gap-3 rounded-xl bg-slate-50 p-3"
                  >
                    <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />

                    <span className="break-words text-sm leading-5 text-slate-600">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No additional perks mentioned.
              </p>
            )}

            {/* Certificate */}
            {internship.certificateProvided && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <FaCertificate className="mt-0.5 shrink-0 text-lg text-emerald-600" />

                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Internship Certificate
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-600">
                    A certificate will be provided after successful completion
                    of the internship.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-bold text-slate-900">
            Internship Details
          </h2>

          <div className="mt-5 divide-y divide-slate-100">
            {/* Stipend */}
            <div className="flex gap-3 pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaMoneyBillWave />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">Monthly Stipend</p>

                <p className="mt-1 break-words text-sm font-bold text-slate-800">
                  {formatStipend(internship.stipend)}
                </p>
              </div>
            </div>

            {/* Openings */}
            <div className="flex gap-3 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaUsers />
              </div>

              <div>
                <p className="text-xs text-slate-400">Openings</p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {internship.openings}{" "}
                  {internship.openings === 1 ? "Position" : "Positions"}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex gap-3 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaBriefcase />
              </div>

              <div>
                <p className="text-xs text-slate-400">Experience</p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {internship.experience || "Not specified"}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex gap-3 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaClock />
              </div>

              <div>
                <p className="text-xs text-slate-400">Duration</p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {internship.duration}
                </p>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex gap-3 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaCalendarAlt />
              </div>

              <div>
                <p className="text-xs text-slate-400">Start Date</p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {formatDate(internship.startDate)}
                </p>
              </div>
            </div>

            {/* Deadline */}
            <div className="flex gap-3 pt-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <FaCalendarAlt />
              </div>

              <div>
                <p className="text-xs text-slate-400">Application Deadline</p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {formatDate(internship.applicationDeadline)}
                </p>
              </div>
            </div>
          </div>

          {/* Apply */}
          <button
            type="button"
            onClick={() => {
              setApplyError("");
              setApplySuccess("");
              setShowApplyModal(true);
            }}
            className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Apply Now
          </button>

          <p className="mt-3 text-center text-xs leading-5 text-slate-400">
            Review the internship requirements carefully before applying.
          </p>
        </aside>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Internship Application
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Apply for {internship.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {internship.recruiter?.companyName || "Company"}
                </p>
              </div>

              <button
                type="button"
                disabled={applying}
                onClick={() => setShowApplyModal(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                aria-label="Close application modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleApply} className="p-5 sm:p-6">
              {/* Resume Info */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-indigo-600" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Your profile resume will be submitted
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Make sure your latest resume is uploaded to your
                      StudentHub profile before applying.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="coverLetter"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Cover Letter
                  </label>

                  <span className="text-xs text-slate-400">Optional</span>
                </div>

                <textarea
                  id="coverLetter"
                  rows={7}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Briefly explain why you're interested in this internship and why you'd be a good fit..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  A short, relevant cover letter can help the recruiter
                  understand your interest.
                </p>
              </div>

              {/* Error */}
              {applyError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-600">
                    {applyError}
                  </p>
                </div>
              )}

              {/* Success */}
              {applySuccess && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-600" />

                    <p className="text-sm font-medium text-emerald-700">
                      {applySuccess}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={applying}
                  onClick={() => setShowApplyModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {applySuccess ? "Close" : "Cancel"}
                </button>

                {!applySuccess && (
                  <button
                    type="submit"
                    disabled={applying}
                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {applying ? "Submitting..." : "Submit Application"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipDetails;
