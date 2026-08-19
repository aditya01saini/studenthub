import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  Users,
  Sparkles,
  Globe,
  X,
} from "lucide-react";

import api from "../../services/api";
import { applyForInternship } from "../../services/application.service";

const PublicInternshipDetails = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Application Modal
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const [coverLetter, setCoverLetter] = useState("");

  const [applying, setApplying] = useState(false);

  const [applicationError, setApplicationError] = useState("");

  const [applicationSuccess, setApplicationSuccess] = useState("");

  // ==========================================
  // FETCH INTERNSHIP
  // ==========================================

  const fetchInternship = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/internships/${internshipId}`);

      setInternship(data.internship);
    } catch (err) {
      console.error("Failed to fetch internship:", err);

      setError(
        err.response?.data?.message || "Unable to load internship details.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (internshipId) {
      fetchInternship();
    }
  }, [internshipId]);

  // ==========================================
  // APPLY NOW
  // ==========================================

  const handleApplyClick = () => {
    const token = localStorage.getItem("token");

    // Guest user
    if (!token) {
      navigate("/login", {
        state: {
          from: `/internships/${internshipId}`,
        },
      });

      return;
    }

    // Logged-in user
    setApplicationError("");
    setApplicationSuccess("");
    setCoverLetter("");
    setApplyModalOpen(true);
  };

  // ==========================================
  // SUBMIT APPLICATION
  // ==========================================

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (applying) {
      return;
    }

    try {
      setApplying(true);
      setApplicationError("");
      setApplicationSuccess("");

      const result = await applyForInternship(internshipId, {
        coverLetter: coverLetter.trim(),
      });

      setApplicationSuccess(
        result.message || "Application submitted successfully.",
      );

      setCoverLetter("");
    } catch (err) {
      console.error("Failed to apply:", err);

      setApplicationError(
        err.response?.data?.message || "Failed to submit application.",
      );
    } finally {
      setApplying(false);
    }
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeApplyModal = () => {
    if (applying) {
      return;
    }

    setApplyModalOpen(false);
    setApplicationError("");
    setApplicationSuccess("");
    setCoverLetter("");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7fb]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <div className="h-16 w-16 rounded-2xl bg-slate-200" />

              <div className="mt-6 h-4 w-40 rounded bg-slate-200" />

              <div className="mt-3 h-9 w-2/3 rounded bg-slate-200" />

              <div className="mt-5 h-5 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !internship) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <BriefcaseBusiness size={28} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Internship Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error || "This internship is no longer available."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/internships")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={16} />
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  const recruiter = internship.recruiter;

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/internships")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Internships
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-indigo-50 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  {/* Company Logo */}

                  {recruiter?.companyLogo ? (
                    <img
                      src={recruiter.companyLogo}
                      alt={recruiter.companyName || "Company"}
                      className="h-16 w-16 shrink-0 rounded-2xl border border-slate-200 bg-white object-contain p-2 shadow-sm sm:h-20 sm:w-20"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 sm:h-20 sm:w-20">
                      <Building2 size={30} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-indigo-600">
                        {recruiter?.companyName || "Company"}
                      </p>

                      {recruiter?.user?.isVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 size={12} />
                          Verified
                        </span>
                      )}
                    </div>

                    <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
                      {internship.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <MetaPill
                        icon={MapPin}
                        text={internship.location || "Location not specified"}
                      />

                      <MetaPill
                        icon={BriefcaseBusiness}
                        text={internship.workMode || "Work mode not specified"}
                      />

                      {internship.category && (
                        <MetaPill icon={Sparkles} text={internship.category} />
                      )}
                    </div>
                  </div>
                </div>

                {internship.isFeatured && (
                  <div className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-600">
                    <Sparkles size={14} />
                    Featured
                  </div>
                )}
              </div>

              {/* Quick Stats */}

              <div className="grid gap-3 border-t border-slate-100 pt-7 sm:grid-cols-2 lg:grid-cols-4">
                <QuickStat
                  icon={IndianRupee}
                  label="Stipend"
                  value={
                    internship.stipend
                      ? `₹${Number(internship.stipend).toLocaleString(
                          "en-IN",
                        )}/month`
                      : "Unpaid"
                  }
                />

                <QuickStat
                  icon={Clock3}
                  label="Duration"
                  value={internship.duration || "Not specified"}
                />

                <QuickStat
                  icon={Users}
                  label="Openings"
                  value={`${internship.openings || 0}`}
                />

                <QuickStat
                  icon={CalendarDays}
                  label="Experience"
                  value={internship.experience || "Fresher"}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}

          <div className="space-y-6">
            {/* About */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                title="About the Internship"
                subtitle="Role overview and opportunity details"
              />

              <div className="mt-6">
                <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600">
                  {internship.description || "No description available."}
                </p>
              </div>
            </section>

            {/* Skills */}

            {internship.skillsRequired?.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <SectionHeading
                  title="Skills Required"
                  subtitle="Technologies and skills preferred for this role"
                />

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {internship.skillsRequired.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Internship Details */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading
                title="Internship Details"
                subtitle="Complete information about this opportunity"
              />

              <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <InfoItem
                  icon={BriefcaseBusiness}
                  label="Category"
                  value={internship.category || "Not specified"}
                />

                <InfoItem
                  icon={Globe}
                  label="Work Mode"
                  value={internship.workMode || "Not specified"}
                />

                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={internship.location || "Not specified"}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Experience"
                  value={internship.experience || "Not specified"}
                />

                <InfoItem
                  icon={Clock3}
                  label="Duration"
                  value={internship.duration || "Not specified"}
                />

                <InfoItem
                  icon={Users}
                  label="Openings"
                  value={`${internship.openings || 0}`}
                />
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            {/* Apply Card */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-100">
                  Ready to apply?
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  Start your application
                </h2>

                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Apply for this internship and take the next step toward your
                  career.
                </p>
              </div>

              <div className="p-6">
                <button
                  type="button"
                  onClick={handleApplyClick}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
                >
                  Apply Now
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Login required if you are not signed in
                </p>
              </div>
            </section>

            {/* Company */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                About the Company
              </h2>

              <div className="mt-5 flex items-center gap-3">
                {recruiter?.companyLogo ? (
                  <img
                    src={recruiter.companyLogo}
                    alt={recruiter.companyName || "Company"}
                    className="h-14 w-14 rounded-2xl border border-slate-200 bg-white object-contain p-2"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Building2 size={24} />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {recruiter?.companyName || "Company"}
                  </p>

                  {recruiter?.user?.isVerified && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 size={13} />
                      Verified Recruiter
                    </p>
                  )}
                </div>
              </div>

              {recruiter?.location && (
                <div className="mt-5 flex items-start gap-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <span>{recruiter.location}</span>
                </div>
              )}

              {recruiter?.website && (
                <a
                  href={recruiter.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <Globe size={15} />
                  Visit company website
                </a>
              )}
            </section>
          </aside>
        </div>
      </main>

      {/* =====================================================
          APPLY MODAL
      ====================================================== */}

      {applyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeApplyModal();
            }
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
                  Application
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Apply for {internship.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {recruiter?.companyName || "Company"}
                </p>
              </div>

              <button
                type="button"
                disabled={applying}
                onClick={closeApplyModal}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <form onSubmit={handleSubmitApplication} className="p-6">
              {/* Resume */}

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Resume ready
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Your saved profile resume will automatically be attached
                      to this application.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="coverLetter"
                    className="text-sm font-bold text-slate-800"
                  >
                    Cover Letter
                  </label>

                  <span className="text-xs text-slate-400">Optional</span>
                </div>

                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={7}
                  maxLength={2000}
                  placeholder="Tell the recruiter why you are a good fit for this internship..."
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <div className="mt-1 flex justify-end text-xs text-slate-400">
                  {coverLetter.length}/2000
                </div>
              </div>

              {/* Error */}

              {applicationError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {applicationError}
                </div>
              )}

              {/* Success */}

              {applicationSuccess && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                  {applicationSuccess}
                </div>
              )}

              {/* Buttons */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={applying}
                  onClick={closeApplyModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={applying || Boolean(applicationSuccess)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {applying ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// QUICK STAT
// =====================================================

const QuickStat = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={16} />

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
};

// =====================================================
// META PILL
// =====================================================

const MetaPill = ({ icon: Icon, text }) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
      <Icon size={14} className="text-slate-400" />
      {text}
    </span>
  );
};

// =====================================================
// SECTION HEADING
// =====================================================

const SectionHeading = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
};

// =====================================================
// INFO ITEM
// =====================================================

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default PublicInternshipDetails;
