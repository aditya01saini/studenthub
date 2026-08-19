import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MoreVertical,
  Power,
  Search,
  RefreshCw,
  BriefcaseBusiness,
  Star,
  CheckCircle2,
  XCircle,
  MapPin,
  CalendarDays,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AdminInternshipDetailsModal from "../../components/admin/AdminInternshipDetailsModal";

import InternshipActionModal from "../../components/admin/InternshipActionModal";
import api from "../../services/api";

const AdminInternships = () => {
  const [internships, setInternships] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalInternships: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [selectedInternship, setSelectedInternship] = useState(null);

  const [actionMenu, setActionMenu] = useState(null);

  const [internshipAction, setInternshipAction] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);

  // ==========================================
  // FETCH INTERNSHIPS
  // ==========================================

  useEffect(() => {
    fetchInternships();
  }, [currentPage, category, workMode, status, featured]);

  const fetchInternships = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const params = new URLSearchParams();

      params.set("page", currentPage);
      params.set("limit", 10);

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (category) {
        params.set("category", category);
      }

      if (workMode) {
        params.set("workMode", workMode);
      }

      if (status) {
        params.set("status", status);
      }

      if (featured) {
        params.set("featured", featured);
      }

      const response = await api.get(`/admin/internships?${params.toString()}`);

      const data = response.data;

      if (!data?.success) {
        setError("Unable to load internships.");
        return;
      }

      setInternships(data.internships || []);

      setPagination({
        totalInternships: data.totalInternships || 0,
        totalPages: data.totalPages || 1,
        hasNextPage: data.hasNextPage || false,
        hasPreviousPage: data.hasPreviousPage || false,
      });
    } catch (err) {
      console.error("Admin internships error:", err);

      setError(err?.response?.data?.message || "Failed to load internships.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleInternshipAction = async () => {
    if (!internshipAction?.internship) {
      return;
    }

    const internship = internshipAction.internship;
    const action = internshipAction.action;

    try {
      setActionLoading(true);

      let response;

      // ==========================================
      // ACTIVATE / DEACTIVATE
      // ==========================================

      if (action === "activate" || action === "deactivate") {
        response = await api.patch(
          `/admin/internships/${internship._id}/status`,
          {
            isActive: action === "activate",
          },
        );
      }

      // ==========================================
      // FEATURE / UNFEATURE
      // ==========================================

      if (action === "feature" || action === "unfeature") {
        response = await api.patch(
          `/admin/internships/${internship._id}/featured`,
          {
            isFeatured: action === "feature",
          },
        );
      }

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Unable to update internship.",
        );
      }

      setInternshipAction(null);

      await fetchInternships(true);
    } catch (error) {
      console.error("Internship action error:", error);

      setError(
        error?.response?.data?.message || "Failed to update internship.",
      );
    } finally {
      setActionLoading(false);
    }
  };
  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (event) => {
    event.preventDefault();

    setCurrentPage(1);

    fetchInternships();
  };

  // ==========================================
  // FILTER CHANGE
  // ==========================================

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setWorkMode("");
    setStatus("");
    setFeatured("");
    setCurrentPage(1);
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" />

            <div>
              <h2 className="font-semibold text-red-800">
                Internships unavailable
              </h2>

              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          </div>

          <button
            onClick={() => fetchInternships(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ==========================================
          HEADER
      =========================================== */}

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Internship Management
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Internships
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage internships, monitor their status and control featured
            opportunities across StudentHub.
          </p>
        </div>

        <button
          onClick={() => fetchInternships(true)}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </motion.section>

      {/* ==========================================
          KPI
      =========================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Internships"
          value={pagination.totalInternships}
          icon={<BriefcaseBusiness size={21} />}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Current Page"
          value={currentPage}
          icon={<CalendarDays size={21} />}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Total Pages"
          value={pagination.totalPages}
          icon={<Building2 size={21} />}
          iconClass="bg-violet-50 text-violet-600"
        />

        <StatCard
          title="Featured Filter"
          value={
            featured === "true"
              ? "Featured"
              : featured === "false"
                ? "Normal"
                : "All"
          }
          icon={<Star size={21} />}
          iconClass="bg-amber-50 text-amber-600"
        />
      </section>

      {/* ==========================================
          FILTERS
      =========================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 md:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search internship title or description..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Search
            </button>
          </form>

          {/* FILTER ROW */}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI / ML">AI / ML</option>
              <option value="UI / UX">UI / UX</option>
            </select>

            <select
              value={workMode}
              onChange={(e) => {
                setWorkMode(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              <option value="">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={featured}
              onChange={(e) => {
                setFeatured(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              <option value="">All Internships</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="w-fit text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            Clear all filters
          </button>
        </div>
      </section>

      {/* ==========================================
          INTERNSHIPS
      =========================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Internship Listings
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {internships.length} internships shown
              </p>
            </div>

            <BriefcaseBusiness size={20} className="text-slate-400" />
          </div>
        </div>

        {internships.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <BriefcaseBusiness size={42} className="mx-auto text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-800">
              No internships found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {internships.map((internship, index) => {
              const recruiter = internship.recruiter || {};

              return (
                <motion.div
                  key={internship._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-5 transition hover:bg-slate-50/70"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* LEFT */}

                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-indigo-50 text-indigo-600">
                        {recruiter.companyLogo ? (
                          <img
                            src={recruiter.companyLogo}
                            alt={recruiter.companyName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <BriefcaseBusiness size={23} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-bold text-slate-900">
                            {internship.title || "Untitled Internship"}
                          </h3>

                          {internship.isFeatured && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                              <Star size={11} />
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-medium text-slate-600">
                          {recruiter.companyName || "Company not specified"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} />
                            {recruiter.location || "Location not specified"}
                          </span>

                          <span>
                            {internship.category || "Category not specified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={internship.status} />

                      <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        {internship.workMode || "—"}
                      </span>

                      <span className="text-xs text-slate-400">
                        Deadline: {formatDate(internship.deadline)}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActionMenu(
                            actionMenu === internship._id
                              ? null
                              : internship._id,
                          )
                        }
                        className="
      rounded-xl
      p-2
      text-slate-400
      transition
      hover:bg-slate-100
      hover:text-slate-700
    "
                      >
                        <MoreVertical size={18} />
                      </button>

                      {actionMenu === internship._id && (
                        <div
                          className="
        absolute
        right-0
        top-11
        z-30
        w-52
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        p-1.5
        shadow-xl
      "
                        >
                          {/* View Details */}

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInternship(internship);
                              setActionMenu(null);
                            }}
                            className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-left
          text-xs
          font-semibold
          text-slate-600
          hover:bg-slate-50
        "
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <div className="my-1 border-t border-slate-100" />

                          {/* Active Status */}

                          <button
                            type="button"
                            onClick={() => {
                              setInternshipAction({
                                internship,
                                action: internship.isActive
                                  ? "deactivate"
                                  : "activate",
                              });

                              setActionMenu(null);
                            }}
                            className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-left
          text-xs
          font-semibold
          text-slate-600
          hover:bg-slate-50
        "
                          >
                            <Power size={15} />

                            {internship.isActive
                              ? "Deactivate Internship"
                              : "Activate Internship"}
                          </button>

                          {/* Featured */}

                          <button
                            type="button"
                            onClick={() => {
                              setInternshipAction({
                                internship,
                                action: internship.isFeatured
                                  ? "unfeature"
                                  : "feature",
                              });

                              setActionMenu(null);
                            }}
                            className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-left
          text-xs
          font-semibold
          text-amber-600
          hover:bg-amber-50
        "
                          >
                            <Star size={15} />

                            {internship.isFeatured
                              ? "Remove Feature"
                              : "Feature Internship"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ==========================================
            PAGINATION
        =========================================== */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Page{" "}
            <span className="font-semibold text-slate-700">{currentPage}</span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {pagination.totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={!pagination.hasPreviousPage}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
      {/* ==========================================
    INTERNSHIP DETAILS MODAL
=========================================== */}

      <AdminInternshipDetailsModal
        internship={selectedInternship}
        onClose={() => {
          setSelectedInternship(null);
        }}
      />

      {/* ==========================================
    INTERNSHIP ACTION MODAL
=========================================== */}

      <InternshipActionModal
        internship={internshipAction?.internship}
        action={internshipAction?.action}
        loading={actionLoading}
        onClose={() => {
          if (!actionLoading) {
            setInternshipAction(null);
          }
        }}
        onConfirm={handleInternshipAction}
      />
    </div>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({ title, value, icon, iconClass }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">{value}</h2>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// STATUS BADGE
// ==========================================

const StatusBadge = ({ status }) => {
  if (status === "Open") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
        <CheckCircle2 size={13} />
        Open
      </span>
    );
  }

  if (status === "Closed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
        <XCircle size={13} />
        Closed
      </span>
    );
  }

  return (
    <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
      {status || "Unknown"}
    </span>
  );
};

export default AdminInternships;
