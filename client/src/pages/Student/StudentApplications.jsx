import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getMyApplications,
  withdrawApplication,
} from "../../services/student.service";

const StudentApplications = () => {
  const navigate = useNavigate();

  // ===========================
  // States
  // ===========================

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const applicationsPerPage = 6;

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [withdrawing, setWithdrawing] = useState(false);

  // ===========================
  // Fetch Applications
  // ===========================

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getMyApplications();

      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  // ===========================
  // Statistics
  // ===========================

  const totalApplications = applications.length;

  const pendingCount = applications.filter(
    (item) => item.status === "Pending",
  ).length;

  const shortlistedCount = applications.filter(
    (item) => item.status === "Shortlisted",
  ).length;

  const acceptedCount = applications.filter(
    (item) => item.status === "Accepted",
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "Rejected",
  ).length;

  // ===========================
  // Search + Filter
  // ===========================

  const filteredApplications = useMemo(() => {
    return [...applications]
      .filter((application) => {
        const internship = application.internship || {};

        const title = internship.title || "";

        const company =
          application.recruiter?.companyName || internship.companyName || "";
        const status = application.status || "";

        const matchesSearch =
          title.toLowerCase().includes(search.toLowerCase()) ||
          company.toLowerCase().includes(search.toLowerCase()) ||
          status.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" ? true : application.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [applications, search, statusFilter, sortBy]);

  const totalPages = Math.ceil(
    filteredApplications.length / applicationsPerPage,
  );

  const startIndex = (currentPage - 1) * applicationsPerPage;

  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + applicationsPerPage,
  );
  const handleWithdraw = async () => {
    if (!selectedApplication) return;

    try {
      setWithdrawing(true);

      const data = await withdrawApplication(selectedApplication._id);

      if (data.success) {
        setShowWithdrawModal(false);
        setSelectedApplication(null);
        fetchApplications();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to withdraw application.");
    } finally {
      setWithdrawing(false);
    }
  };

  const getRelativeDate = (date) => {
    const now = new Date();
    const appliedDate = new Date(date);

    const diffInMs = now - appliedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";

    if (diffInDays < 7) return `${diffInDays} days ago`;

    if (diffInDays < 30)
      return `${Math.floor(diffInDays / 7)} week${
        Math.floor(diffInDays / 7) > 1 ? "s" : ""
      } ago`;

    if (diffInDays < 365)
      return `${Math.floor(diffInDays / 30)} month${
        Math.floor(diffInDays / 30) > 1 ? "s" : ""
      } ago`;

    return `${Math.floor(diffInDays / 365)} year${
      Math.floor(diffInDays / 365) > 1 ? "s" : ""
    } ago`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Loading */}

      {loading && (
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      )}

      {!loading && (
        <>
          {/* Hero */}

          <section className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Career Journey
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              My Applications
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Track every internship application you've submitted, monitor
              recruiter responses, and manage your career journey from one
              place.
            </p>
          </section>

          {/* Statistics */}

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              title="Total"
              value={totalApplications}
              color="slate"
              icon={<FaClipboardList />}
            />

            <StatCard
              title="Pending"
              value={pendingCount}
              color="yellow"
              icon={<FaClock />}
            />

            <StatCard
              title="Shortlisted"
              value={shortlistedCount}
              color="blue"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Accepted"
              value={acceptedCount}
              color="green"
              icon={<FaCheckCircle />}
            />

            <StatCard
              title="Rejected"
              value={rejectedCount}
              color="red"
              icon={<FaTimesCircle />}
            />
          </section>

          {/* Toolbar */}

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search internship or company..."
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </section>

          {/* Header */}

          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">Applications</h2>

            <p className="text-sm text-slate-500">
              {filteredApplications.length} found
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {!error && filteredApplications.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-xl font-semibold">No Applications Found</h3>

              <p className="mt-3 text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {!error && filteredApplications.length > 0 && (
            <>
              <div className="mt-8 space-y-5">
                {paginatedApplications.map((application) => {
                  const internship = application.internship || {};
                  const recruiter = application.recruiter || {};

                  const companyName =
                    recruiter.companyName ||
                    internship.companyName ||
                    "Unknown Company";

                  const companyLogo =
                    recruiter.companyLogo ||
                    internship.companyLogo ||
                    "https://placehold.co/80x80?text=Logo";

                  return (
                    <div
                      key={application._id}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex gap-4">
                          <img
                            src={companyLogo}
                            alt={companyName}
                            className="h-16 w-16 rounded-xl border object-cover"
                          />

                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              {internship.title}
                            </h3>

                            <p className="mt-1 text-slate-600">{companyName}</p>

                            <p className="mt-2 text-sm text-slate-500">
                              Applied {getRelativeDate(application.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div>
                          <span
                            className={`rounded-full px-4 py-2 text-sm font-semibold ${
                              application.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : application.status === "Accepted"
                                  ? "bg-green-100 text-green-700"
                                  : application.status === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : application.status === "Shortlisted"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {application.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Resume
                          </p>

                          <p className="mt-1 font-medium text-slate-900">
                            Submitted
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Cover Letter
                          </p>

                          <p className="mt-1 text-slate-900">
                            {application.coverLetter ? "Provided" : "Not Added"}
                          </p>
                        </div>
                      </div>

                      {application.recruiterRemark && (
                        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
                          <p className="text-sm font-semibold text-blue-700">
                            Recruiter Feedback
                          </p>

                          <p className="mt-2 text-sm text-slate-700">
                            {application.recruiterRemark}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            navigate(`/student/internships/${internship._id}`)
                          }
                          className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700"
                        >
                          View Internship
                        </button>

                        {(application.status === "Pending" ||
                          application.status === "Shortlisted") && (
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowWithdrawModal(true);
                            }}
                            className="rounded-xl border border-red-300 px-5 py-2 font-medium text-red-600 hover:bg-red-50"
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`h-10 w-10 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-white"
                          : "border"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* Withdraw Modal */}

          {showWithdrawModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-bold">Withdraw Application</h2>

                <p className="mt-3 text-slate-500">
                  Are you sure you want to withdraw this application?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowWithdrawModal(false);
                      setSelectedApplication(null);
                    }}
                    className="rounded-xl border px-5 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={withdrawing}
                    onClick={handleWithdraw}
                    className="rounded-xl bg-red-600 px-5 py-2 text-white disabled:opacity-50"
                  >
                    {withdrawing ? "Withdrawing..." : "Withdraw"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => {
  const colorClasses = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className={`rounded-2xl border p-5 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default StudentApplications;
