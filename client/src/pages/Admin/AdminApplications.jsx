import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  RefreshCw,
  MoreVertical,
  Eye,
  FileText,
  UserRound,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CheckCircle2,
  XCircle,
  UserCheck,
  Ban,
  SlidersHorizontal,
  X,
} from "lucide-react";

import api from "../../services/api";
import AdminApplicationDetailsModal from "../../components/admin/AdminApplicationDetailsModal";

// ==========================================
// STATUS OPTIONS
// ==========================================

const STATUS_OPTIONS = [
  "All",
  "Pending",
  "Shortlisted",
  "Accepted",
  "Rejected",
  "Withdrawn",
];

// ==========================================
// COMPONENT
// ==========================================

const AdminApplications = () => {
  // ==========================================
  // APPLICATION DATA
  // ==========================================

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // SEARCH / FILTERS
  // ==========================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [studentFilter, setStudentFilter] = useState("");

  const [recruiterFilter, setRecruiterFilter] = useState("");

  const [internshipFilter, setInternshipFilter] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  // ==========================================
  // PAGINATION
  // ==========================================

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalApplications: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // ==========================================
  // ACTION MENU
  // ==========================================

  const [actionMenu, setActionMenu] = useState(null);

  // ==========================================
  // APPLICATION DETAILS
  // ==========================================

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [applicationDetailsLoading, setApplicationDetailsLoading] =
    useState(false);

  // ==========================================
  // FETCH APPLICATIONS
  // ==========================================

  const fetchApplications = useCallback(
    async (showRefreshLoader = false) => {
      try {
        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const params = {
          page,
          limit: 10,
        };

        // Search

        if (search.trim()) {
          params.search = search.trim();
        }

        // Status

        if (status !== "All") {
          params.status = status;
        }

        // Student

        if (studentFilter) {
          params.student = studentFilter;
        }

        // Recruiter

        if (recruiterFilter) {
          params.recruiter = recruiterFilter;
        }

        // Internship

        if (internshipFilter) {
          params.internship = internshipFilter;
        }

        const response = await api.get("/admin/applications", {
          params,
        });

        const data = response.data;

        if (data.success) {
          setApplications(data.applications || []);

          setPagination({
            totalPages: data.totalPages || 1,

            totalApplications: data.totalApplications || 0,

            hasNextPage: data.hasNextPage || false,

            hasPreviousPage: data.hasPreviousPage || false,
          });
        }
      } catch (err) {
        console.error("Failed to fetch admin applications:", err);

        setError(err.response?.data?.message || "Unable to load applications.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, search, status, studentFilter, recruiterFilter, internshipFilter],
  );

  // ==========================================
  // INITIAL FETCH
  // ==========================================

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // ==========================================
  // SEARCH DEBOUNCE
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) {
        setPage(1);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ==========================================
  // CLOSE ACTION MENU ON OUTSIDE CLICK
  // ==========================================

  useEffect(() => {
    const handleClick = () => {
      setActionMenu(null);
    };

    if (actionMenu) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [actionMenu]);

  // ==========================================
  // VIEW APPLICATION
  // ==========================================

  const handleViewApplication = async (application) => {
    try {
      setActionMenu(null);

      setApplicationDetailsLoading(true);

      setSelectedApplication(null);

      const response = await api.get(`/admin/applications/${application._id}`);

      if (response.data.success) {
        setSelectedApplication(response.data.application);
      }
    } catch (error) {
      console.error("Failed to fetch application details:", error);

      setError(
        error.response?.data?.message || "Unable to load application details.",
      );
    } finally {
      setApplicationDetailsLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedApplication?._id) {
      return;
    }

    try {
      setStatusUpdating(true);
      setError("");

      const response = await api.patch(
        `/admin/applications/${selectedApplication._id}/status`,
        {
          status,
        },
      );

      if (response.data.success) {
        setSelectedApplication(response.data.application);

        await fetchApplications(true);
      }
    } catch (error) {
      console.error("Failed to update application status:", error);

      setError(
        error.response?.data?.message || "Unable to update application status.",
      );
    } finally {
      setStatusUpdating(false);
    }
  };

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setStudentFilter("");
    setRecruiterFilter("");
    setInternshipFilter("");
    setPage(1);
  };

  // ==========================================
  // ACTIVE FILTER COUNT
  // ==========================================

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (status !== "All") count++;

    if (studentFilter) count++;

    if (recruiterFilter) count++;

    if (internshipFilter) count++;

    return count;
  }, [status, studentFilter, recruiterFilter, internshipFilter]);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // STUDENT NAME
  // ==========================================

  const getStudentName = (application) => {
    return (
      application?.student?.user?.fullName ||
      application?.student?.fullName ||
      "Student"
    );
  };

  // ==========================================
  // COMPANY NAME
  // ==========================================

  const getCompanyName = (application) => {
    return application?.recruiter?.companyName || "Company";
  };

  // ==========================================
  // STATUS CONFIG
  // ==========================================

  const getStatusConfig = (applicationStatus) => {
    switch (applicationStatus) {
      case "Accepted":
        return {
          icon: CheckCircle2,
          className: "bg-emerald-50 text-emerald-700 border-emerald-100",
        };

      case "Shortlisted":
        return {
          icon: UserCheck,
          className: "bg-indigo-50 text-indigo-700 border-indigo-100",
        };

      case "Rejected":
        return {
          icon: XCircle,
          className: "bg-red-50 text-red-700 border-red-100",
        };

      case "Withdrawn":
        return {
          icon: Ban,
          className: "bg-slate-100 text-slate-600 border-slate-200",
        };

      default:
        return {
          icon: Clock3,
          className: "bg-amber-50 text-amber-700 border-amber-100",
        };
    }
  };

  // ==========================================
  // FILTER OPTIONS
  // ==========================================
  // These are generated from the currently loaded
  // applications because the current backend does
  // not expose separate filter-options endpoints.
  // ==========================================

  const studentOptions = useMemo(() => {
    const map = new Map();

    applications.forEach((item) => {
      if (item.student?._id) {
        map.set(
          item.student._id,
          item.student.user?.fullName || item.student.fullName || "Student",
        );
      }
    });

    return Array.from(map.entries());
  }, [applications]);

  const recruiterOptions = useMemo(() => {
    const map = new Map();

    applications.forEach((item) => {
      if (item.recruiter?._id) {
        map.set(item.recruiter._id, item.recruiter.companyName || "Company");
      }
    });

    return Array.from(map.entries());
  }, [applications]);

  const internshipOptions = useMemo(() => {
    const map = new Map();

    applications.forEach((item) => {
      if (item.internship?._id) {
        map.set(item.internship._id, item.internship.title || "Internship");
      }
    });

    return Array.from(map.entries());
  }, [applications]);

  // ==========================================
  // STATS
  // ==========================================
  // These status numbers represent the current
  // loaded page, while Total represents the
  // complete filtered result count.
  // ==========================================

  const stats = [
    {
      label: "Total Applications",
      value: pagination.totalApplications,
      icon: FileText,
      className: "bg-indigo-50 text-indigo-600",
    },

    {
      label: "Pending",
      value: applications.filter((item) => item.status === "Pending").length,
      icon: Clock3,
      className: "bg-amber-50 text-amber-600",
    },

    {
      label: "Shortlisted",
      value: applications.filter((item) => item.status === "Shortlisted")
        .length,
      icon: UserCheck,
      className: "bg-blue-50 text-blue-600",
    },

    {
      label: "Accepted",
      value: applications.filter((item) => item.status === "Accepted").length,
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-600",
    },
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ==========================================
            PAGE HEADER
        =========================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-indigo-500
            "
            >
              MANAGEMENT
            </p>

            <h1
              className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
            "
            >
              Applications
            </h1>

            <p
              className="
              mt-1
              text-sm
              text-slate-500
            "
            >
              Review and monitor internship applications across StudentHub.
            </p>
          </div>

          {/* Refresh */}

          <button
            type="button"
            onClick={() => fetchApplications(true)}
            disabled={refreshing}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
              transition
              hover:border-slate-300
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </motion.div>

        {/* ==========================================
            STAT CARDS
        =========================================== */}

        <div
          className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                  "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-xs
                        font-medium
                        text-slate-400
                      "
                    >
                      {stat.label}
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        ${stat.className}
                      `}
                  >
                    <Icon size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==========================================
            FILTER BAR
        =========================================== */}

        <div
          className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
        "
        >
          {/* Main Filters */}

          <div
            className="
            flex
            flex-col
            gap-3
            lg:flex-row
          "
          >
            {/* Search */}

            <div
              className="
              relative
              min-w-0
              flex-1
            "
            >
              <Search
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="
                  Search student, company or internship...
                "
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-10
                  pr-4
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-indigo-300
                  focus:bg-white
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />
            </div>

            {/* Status */}

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);

                setPage(1);
              }}
              className="
                h-11
                min-w-[180px]
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                text-sm
                font-medium
                text-slate-600
                outline-none
                transition
                focus:border-indigo-300
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-50
              "
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All Statuses" : option}
                </option>
              ))}
            </select>

            {/* Advanced Filter Button */}

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                px-4
                text-xs
                font-semibold
                transition
                ${
                  showFilters || activeFilterCount > 0
                    ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-600
                  px-1.5
                  text-[9px]
                  font-bold
                  text-white
                "
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* ==========================================
              ADVANCED FILTERS
          =========================================== */}

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  overflow-hidden
                  border-t
                  border-slate-100
                  mt-4
                  pt-4
                "
              >
                <div
                  className="
                  grid
                  grid-cols-1
                  gap-3
                  md:grid-cols-3
                "
                >
                  {/* Student */}

                  <select
                    value={studentFilter}
                    onChange={(event) => {
                      setStudentFilter(event.target.value);

                      setPage(1);
                    }}
                    className="
                      h-11
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      text-slate-600
                      outline-none
                      transition
                      focus:border-indigo-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-50
                    "
                  >
                    <option value="">All Students</option>

                    {studentOptions.map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>

                  {/* Recruiter */}

                  <select
                    value={recruiterFilter}
                    onChange={(event) => {
                      setRecruiterFilter(event.target.value);

                      setPage(1);
                    }}
                    className="
                      h-11
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      text-slate-600
                      outline-none
                      transition
                      focus:border-indigo-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-50
                    "
                  >
                    <option value="">All Recruiters</option>

                    {recruiterOptions.map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>

                  {/* Internship */}

                  <select
                    value={internshipFilter}
                    onChange={(event) => {
                      setInternshipFilter(event.target.value);

                      setPage(1);
                    }}
                    className="
                      h-11
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      text-slate-600
                      outline-none
                      transition
                      focus:border-indigo-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-50
                    "
                  >
                    <option value="">All Internships</option>

                    {internshipOptions.map(([id, title]) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear */}

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      mt-3
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      text-indigo-600
                      transition
                      hover:text-indigo-700
                    "
                  >
                    <X size={13} />
                    Clear filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ==========================================
            APPLICATION TABLE
        =========================================== */}

        <div
          className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
        >
          {/* Table Header */}

          <div
            className="
            border-b
            border-slate-100
            px-5
            py-4
          "
          >
            <div
              className="
              flex
              items-center
              justify-between
            "
            >
              <div>
                <h2
                  className="
                  text-sm
                  font-bold
                  text-slate-900
                "
                >
                  Application Listings
                </h2>

                <p
                  className="
                  mt-1
                  text-xs
                  text-slate-400
                "
                >
                  {pagination.totalApplications} applications found
                </p>
              </div>

              <FileText size={19} className="text-slate-300" />
            </div>
          </div>

          {/* ==========================================
              LOADING
          =========================================== */}

          {loading ? (
            <div className="space-y-3 p-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="
                      animate-pulse
                      rounded-xl
                      border
                      border-slate-100
                      p-4
                    "
                >
                  <div className="flex gap-4">
                    <div
                      className="
                        h-11
                        w-11
                        rounded-xl
                        bg-slate-100
                      "
                    />

                    <div
                      className="
                        flex-1
                        space-y-2
                      "
                    >
                      <div
                        className="
                          h-3
                          w-40
                          rounded
                          bg-slate-100
                        "
                      />

                      <div
                        className="
                          h-3
                          w-64
                          rounded
                          bg-slate-100
                        "
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* ========================================
                ERROR
            ========================================= */

            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              px-6
              py-16
              text-center
            "
            >
              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-500
              "
              >
                <XCircle size={22} />
              </div>

              <h3
                className="
                mt-4
                text-sm
                font-bold
                text-slate-800
              "
              >
                Unable to load applications
              </h3>

              <p
                className="
                mt-1
                max-w-sm
                text-xs
                text-slate-400
              "
              >
                {error}
              </p>

              <button
                type="button"
                onClick={() => fetchApplications()}
                className="
                  mt-4
                  rounded-xl
                  bg-slate-900
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                "
              >
                Try Again
              </button>
            </div>
          ) : applications.length === 0 ? (
            /* ========================================
                EMPTY
            ========================================= */

            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              px-6
              py-16
              text-center
            "
            >
              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-400
              "
              >
                <FileText size={24} />
              </div>

              <h3
                className="
                mt-4
                text-sm
                font-bold
                text-slate-800
              "
              >
                No applications found
              </h3>

              <p
                className="
                mt-1
                max-w-sm
                text-xs
                text-slate-400
              "
              >
                Try changing your search or filter options.
              </p>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    mt-4
                    rounded-xl
                    bg-slate-900
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* ======================================
                  DESKTOP TABLE
              ======================================= */}

              <div
                className="
                hidden
                overflow-x-auto
                md:block
              "
              >
                <table
                  className="
                  w-full
                  min-w-[900px]
                "
                >
                  <thead>
                    <tr
                      className="
                      border-b
                      border-slate-100
                      bg-slate-50/70
                    "
                    >
                      <th
                        className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                      >
                        Student
                      </th>

                      <th
                        className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                      >
                        Internship
                      </th>

                      <th
                        className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                      >
                        Company
                      </th>

                      <th
                        className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                      >
                        Applied
                      </th>

                      <th
                        className="
                        px-5
                        py-3
                        text-left
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                      >
                        Status
                      </th>

                      <th
                        className="
                        w-12
                        px-3
                        py-3
                      "
                      />
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((application, index) => {
                      const statusConfig = getStatusConfig(application.status);

                      const StatusIcon = statusConfig.icon;

                      return (
                        <motion.tr
                          key={application._id}
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: index * 0.03,
                          }}
                          className="
                              border-b
                              border-slate-100
                              last:border-0
                              hover:bg-slate-50/60
                            "
                        >
                          {/* Student */}

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  shrink-0
                                  items-center
                                  justify-center
                                  overflow-hidden
                                  rounded-xl
                                  bg-indigo-50
                                  text-indigo-500
                                "
                              >
                                {application.student?.profileImage ? (
                                  <img
                                    src={application.student.profileImage}
                                    alt=""
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                      "
                                  />
                                ) : (
                                  <UserRound size={17} />
                                )}
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="
                                    max-w-[180px]
                                    truncate
                                    text-xs
                                    font-bold
                                    text-slate-800
                                  "
                                >
                                  {getStudentName(application)}
                                </p>

                                <p
                                  className="
                                    mt-1
                                    max-w-[180px]
                                    truncate
                                    text-[11px]
                                    text-slate-400
                                  "
                                >
                                  {application.student?.course || "Student"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Internship */}

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2.5
                              "
                            >
                              <BriefcaseBusiness
                                size={16}
                                className="
                                    shrink-0
                                    text-slate-400
                                  "
                              />

                              <div className="min-w-0">
                                <p
                                  className="
                                    max-w-[220px]
                                    truncate
                                    text-xs
                                    font-semibold
                                    text-slate-700
                                  "
                                >
                                  {application.internship?.title ||
                                    "Internship"}
                                </p>

                                <p
                                  className="
                                    mt-1
                                    text-[11px]
                                    text-slate-400
                                  "
                                >
                                  {application.internship?.workMode || "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Company */}

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2.5
                              "
                            >
                              <Building2
                                size={16}
                                className="
                                    shrink-0
                                    text-slate-400
                                  "
                              />

                              <div className="min-w-0">
                                <p
                                  className="
                                    max-w-[170px]
                                    truncate
                                    text-xs
                                    font-semibold
                                    text-slate-700
                                  "
                                >
                                  {getCompanyName(application)}
                                </p>

                                <p
                                  className="
                                    mt-1
                                    max-w-[170px]
                                    truncate
                                    text-[11px]
                                    text-slate-400
                                  "
                                >
                                  {application.recruiter?.location || "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Applied */}

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-slate-500
                              "
                            >
                              <CalendarDays
                                size={14}
                                className="
                                    text-slate-400
                                  "
                              />

                              {formatDate(application.appliedAt)}
                            </div>
                          </td>

                          {/* Status */}

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <span
                              className={`
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  border
                                  px-2.5
                                  py-1.5
                                  text-[10px]
                                  font-bold
                                  ${statusConfig.className}
                                `}
                            >
                              <StatusIcon size={12} />

                              {application.status || "Pending"}
                            </span>
                          </td>

                          {/* Actions */}

                          <td
                            className="
                              relative
                              px-3
                              py-4
                            "
                          >
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();

                                setActionMenu(
                                  actionMenu === application._id
                                    ? null
                                    : application._id,
                                );
                              }}
                              className="
                                  flex
                                  h-8
                                  w-8
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-slate-400
                                  transition
                                  hover:bg-slate-100
                                  hover:text-slate-700
                                "
                            >
                              <MoreVertical size={17} />
                            </button>

                            {actionMenu === application._id && (
                              <div
                                onClick={(event) => event.stopPropagation()}
                                className="
                                    absolute
                                    right-4
                                    top-12
                                    z-30
                                    w-48
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-1.5
                                    shadow-xl
                                  "
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleViewApplication(application)
                                  }
                                  className="
                                      flex
                                      w-full
                                      items-center
                                      gap-2.5
                                      rounded-lg
                                      px-3
                                      py-2.5
                                      text-left
                                      text-xs
                                      font-semibold
                                      text-slate-600
                                      transition
                                      hover:bg-slate-50
                                      hover:text-slate-900
                                    "
                                >
                                  <Eye size={15} />
                                  View Application
                                </button>
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ======================================
                  MOBILE CARDS
              ======================================= */}

              <div
                className="
                space-y-3
                p-4
                md:hidden
              "
              >
                {applications.map((application, index) => {
                  const statusConfig = getStatusConfig(application.status);

                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.div
                      key={application._id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className="
                          rounded-xl
                          border
                          border-slate-100
                          bg-white
                          p-4
                        "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          "
                        >
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-xl
                              bg-indigo-50
                              text-indigo-500
                            "
                          >
                            {application.student?.profileImage ? (
                              <img
                                src={application.student.profileImage}
                                alt=""
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                  "
                              />
                            ) : (
                              <UserRound size={17} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                truncate
                                text-xs
                                font-bold
                                text-slate-800
                              "
                            >
                              {getStudentName(application)}
                            </p>

                            <p
                              className="
                                mt-1
                                truncate
                                text-[11px]
                                text-slate-400
                              "
                            >
                              {application.internship?.title || "Internship"}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`
                              inline-flex
                              shrink-0
                              items-center
                              gap-1
                              rounded-lg
                              border
                              px-2
                              py-1
                              text-[9px]
                              font-bold
                              ${statusConfig.className}
                            `}
                        >
                          <StatusIcon size={10} />

                          {application.status || "Pending"}
                        </span>
                      </div>

                      <div
                        className="
                          mt-4
                          grid
                          grid-cols-2
                          gap-3
                        "
                      >
                        <div>
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wider
                              text-slate-400
                            "
                          >
                            Company
                          </p>

                          <p
                            className="
                              mt-1
                              truncate
                              text-xs
                              font-semibold
                              text-slate-700
                            "
                          >
                            {getCompanyName(application)}
                          </p>
                        </div>

                        <div>
                          <p
                            className="
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wider
                              text-slate-400
                            "
                          >
                            Applied
                          </p>

                          <p
                            className="
                              mt-1
                              text-xs
                              font-semibold
                              text-slate-700
                            "
                          >
                            {formatDate(application.appliedAt)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleViewApplication(application)}
                        className="
                            mt-4
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            py-2.5
                            text-xs
                            font-semibold
                            text-slate-600
                            transition
                            hover:bg-slate-50
                          "
                      >
                        <Eye size={14} />
                        View Application
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

          {/* ==========================================
              PAGINATION
          =========================================== */}

          {!loading && !error && applications.length > 0 && (
            <div
              className="
                flex
                flex-col
                gap-3
                border-t
                border-slate-100
                px-5
                py-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Page{" "}
                <span
                  className="
                    font-semibold
                    text-slate-600
                  "
                >
                  {page}
                </span>{" "}
                of{" "}
                <span
                  className="
                    font-semibold
                    text-slate-600
                  "
                >
                  {pagination.totalPages}
                </span>
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <button
                  type="button"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
                  className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      text-slate-500
                      transition
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage((current) => current + 1)}
                  className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      text-slate-500
                      transition
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            APPLICATION DETAILS MODAL
        =========================================== */}

        <AdminApplicationDetailsModal
          application={selectedApplication}
          loading={applicationDetailsLoading}
          statusUpdating={statusUpdating}
          onStatusUpdate={handleStatusUpdate}
          onClose={() => {
            if (!applicationDetailsLoading && !statusUpdating) {
              setSelectedApplication(null);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AdminApplications;
