import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  RefreshCw,
  Building2,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  BriefcaseBusiness,
  Mail,
  CalendarDays,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import api from "../../services/api";
import AdminRecruiterDetailsModal from "../../components/admin/AdminRecruiterDetailsModal.jsx";

import RecruiterVerificationModal from "../../components/admin/RecruiterVerificationModal.jsx";

const AdminRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [verification, setVerification] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalRecruiters: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const [showActionMenu, setShowActionMenu] = useState(null);

  const [verificationAction, setVerificationAction] = useState(null);

  const [verificationLoading, setVerificationLoading] = useState(false);

  // ==========================================
  // FETCH RECRUITERS
  // ==========================================

  useEffect(() => {
    fetchRecruiters();
  }, [currentPage, verification]);

  const fetchRecruiters = async (isRefresh = false) => {
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

      if (verification !== "all") {
        params.set("verification", verification);
      }

      const response = await api.get(`/admin/recruiters?${params.toString()}`);

      const data = response.data;

      if (!data?.success) {
        setError("Unable to load recruiters.");
        return;
      }

      setRecruiters(data.recruiters || []);

      setPagination({
        totalRecruiters: data.totalRecruiters || 0,
        totalPages: data.totalPages || 1,
        hasNextPage: data.hasNextPage || false,
        hasPreviousPage: data.hasPreviousPage || false,
      });
    } catch (err) {
      console.error("Admin recruiters error:", err);

      setError(err?.response?.data?.message || "Failed to load recruiters.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleVerification = async () => {
    if (!verificationAction?.recruiter) {
      return;
    }

    const recruiter = verificationAction.recruiter;

    const isVerify = verificationAction.action === "verify";

    try {
      setVerificationLoading(true);

      const response = await api.patch(
        `/admin/recruiters/${recruiter._id}/verification`,
        {
          isVerifiedCompany: isVerify,
        },
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to update company verification.",
        );
      }

      setVerificationAction(null);

      await fetchRecruiters(true);
    } catch (error) {
      console.error("Company verification error:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to update company verification.",
      );
    } finally {
      setVerificationLoading(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (event) => {
    event.preventDefault();

    setCurrentPage(1);

    fetchRecruiters();
  };

  // ==========================================
  // VERIFICATION FILTER
  // ==========================================

  const handleVerificationChange = (event) => {
    setVerification(event.target.value);
    setCurrentPage(1);
  };

  // ==========================================
  // DATE
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
    return <RecruitersPageSkeleton />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ==========================================
          HEADER
      =========================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Recruiter Management
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Recruiters
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage recruiter accounts, company profiles and company verification
            across StudentHub.
          </p>
        </div>

        {/* Total */}
        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Building2 size={18} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Total Recruiters
            </p>

            <p className="text-lg font-bold text-slate-900">
              {pagination.totalRecruiters}
            </p>
          </div>
        </div>
      </motion.section>

      {/* ==========================================
          ERROR
      =========================================== */}

      {error && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-sm font-medium text-red-700">{error}</p>

          <button
            type="button"
            onClick={() => fetchRecruiters(true)}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* ==========================================
          FILTER BAR
      =========================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.05,
        }}
        className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)]"
      >
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company, industry or location..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50/50
                pl-10
                pr-4
                text-sm
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-indigo-400
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10
              "
            />
          </form>

          {/* Verification */}
          <div className="relative">
            <select
              value={verification}
              onChange={handleVerificationChange}
              className="
                h-11
                w-full
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                pr-10
                text-sm
                font-medium
                text-slate-600
                outline-none
                transition
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-500/10
                lg:w-[175px]
              "
            >
              <option value="all">All Companies</option>

              <option value="verified">Verified</option>

              <option value="unverified">Unverified</option>
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => fetchRecruiters(true)}
            disabled={refreshing}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              font-semibold
              text-slate-600
              transition-all
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-600
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />

            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </motion.section>

      {/* ==========================================
          RECRUITERS TABLE
      =========================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)]"
      >
        {recruiters.length === 0 ? (
          <EmptyRecruiters />
        ) : (
          <>
            {/* Desktop Header */}
            <div className="hidden grid-cols-[minmax(260px,1.7fr)_minmax(160px,1fr)_150px_130px_60px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:grid">
              <span>Company</span>
              <span>Recruiter</span>
              <span>Location</span>
              <span>Verification</span>
              <span />
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {recruiters.map((recruiter, index) => {
                const user = recruiter.user || {};

                return (
                  <motion.div
                    key={recruiter._id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.03,
                    }}
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      px-5
                      py-4
                      transition-colors
                      hover:bg-slate-50/70
                      lg:grid-cols-[minmax(260px,1.7fr)_minmax(160px,1fr)_150px_130px_60px]
                      lg:items-center
                    "
                  >
                    {/* Company */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white shadow-sm">
                        {recruiter.companyLogo ? (
                          <img
                            src={recruiter.companyLogo}
                            alt={recruiter.companyName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          recruiter.companyName?.charAt(0)?.toUpperCase() || "C"
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {recruiter.companyName || "Unnamed Company"}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <BriefcaseBusiness
                            size={12}
                            className="shrink-0 text-slate-400"
                          />

                          <span className="truncate text-xs text-slate-400">
                            {recruiter.industry || "Industry not specified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recruiter */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {user.fullName || "Unknown Recruiter"}
                      </p>

                      <div className="mt-1 flex min-w-0 items-center gap-1.5">
                        <Mail size={12} className="shrink-0 text-slate-400" />

                        <span className="truncate text-xs text-slate-400">
                          {user.email || "No email"}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <MapPin size={14} />
                      </div>

                      <span className="truncate text-xs font-medium text-slate-600">
                        {recruiter.location || "Not specified"}
                      </span>
                    </div>

                    {/* Verification */}
                    <div>
                      {recruiter.isVerifiedCompany ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                          <CheckCircle2 size={12} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[10px] font-bold text-amber-700 ring-1 ring-inset ring-amber-100">
                          <ShieldAlert size={12} />
                          Unverified
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    {/* Action */}
                    <div className="relative flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setShowActionMenu(
                            showActionMenu === recruiter._id
                              ? null
                              : recruiter._id,
                          )
                        }
                        className="
      rounded-lg
      p-2
      text-slate-400
      transition
      hover:bg-slate-100
      hover:text-slate-700
    "
                      >
                        <MoreVertical size={17} />
                      </button>

                      {showActionMenu === recruiter._id && (
                        <div
                          className="
        absolute
        right-0
        top-10
        z-30
        w-48
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
                              setSelectedRecruiter(recruiter);
                              setShowActionMenu(null);
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
          transition
          hover:bg-slate-50
          hover:text-slate-900
        "
                          >
                            <Building2 size={15} />
                            View Details
                          </button>

                          <div className="my-1 border-t border-slate-100" />

                          {/* Verification */}

                          {recruiter.isVerifiedCompany ? (
                            <button
                              type="button"
                              onClick={() => {
                                setVerificationAction({
                                  recruiter,
                                  action: "remove",
                                });

                                setShowActionMenu(null);
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
            transition
            hover:bg-amber-50
          "
                            >
                              <ShieldAlert size={15} />
                              Remove Verification
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setVerificationAction({
                                  recruiter,
                                  action: "verify",
                                });

                                setShowActionMenu(null);
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
            text-emerald-600
            transition
            hover:bg-emerald-50
          "
                            >
                              <ShieldCheck size={15} />
                              Verify Company
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Mobile Details */}
                    <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 lg:hidden">
                      <MobileInfo
                        icon={MapPin}
                        label="Location"
                        value={recruiter.location || "Not specified"}
                      />

                      <MobileInfo
                        icon={CalendarDays}
                        label="Joined"
                        value={formatDate(user.createdAt)}
                      />

                      <MobileInfo
                        icon={ShieldCheck}
                        label="Verification"
                        value={
                          recruiter.isVerifiedCompany
                            ? "Verified"
                            : "Unverified"
                        }
                      />

                      <MobileInfo
                        icon={BriefcaseBusiness}
                        label="Company Size"
                        value={recruiter.companySize || "Not specified"}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPrevious={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              onNext={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, pagination.totalPages),
                )
              }
            />
          </>
        )}
      </motion.section>
      <AdminRecruiterDetailsModal
        recruiter={selectedRecruiter}
        onClose={() => setSelectedRecruiter(null)}
      />
      <RecruiterVerificationModal
        recruiter={verificationAction?.recruiter}
        action={verificationAction?.action === "verify" ? "verify" : "remove"}
        loading={verificationLoading}
        onClose={() => {
          if (!verificationLoading) {
            setVerificationAction(null);
          }
        }}
        onConfirm={handleVerification}
      />
    </div>
  );
};

// ==========================================
// MOBILE INFO
// ==========================================

const MobileInfo = ({ icon: Icon, label, value }) => {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <Icon size={12} className="text-slate-400" />

        <span className="text-[10px] font-medium text-slate-400">{label}</span>
      </div>

      <p className="mt-1 truncate text-xs font-semibold text-slate-600">
        {value}
      </p>
    </div>
  );
};

// ==========================================
// PAGINATION
// ==========================================

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-slate-400">
        Page <span className="font-bold text-slate-700">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-700">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={onPrevious}
          className="
            rounded-lg
            border
            border-slate-200
            px-3
            py-2
            text-xs
            font-semibold
            text-slate-600
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={onNext}
          className="
            rounded-lg
            border
            border-slate-200
            px-3
            py-2
            text-xs
            font-semibold
            text-slate-600
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

// ==========================================
// EMPTY STATE
// ==========================================

const EmptyRecruiters = () => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Building2 size={24} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">
        No recruiters found
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
        Try changing your search or verification filter.
      </p>
    </div>
  );
};

// ==========================================
// LOADING SKELETON
// ==========================================

const RecruitersPageSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="space-y-3">
        <div className="h-3 w-36 animate-pulse rounded bg-slate-200" />

        <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-20 animate-pulse rounded-2xl bg-white" />

      <div className="h-16 animate-pulse rounded-2xl bg-white" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-24 animate-pulse border-b border-slate-100 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminRecruiters;
