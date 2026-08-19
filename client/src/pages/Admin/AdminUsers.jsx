import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminUserDetailsModal from "../../components/admin/AdminUserDetailsModal";
import {
  Search,
  RefreshCw,
  Users,
  ShieldCheck,
  UserRound,
  Building2,
  ChevronDown,
  Mail,
  CalendarDays,
  MoreVertical,
} from "lucide-react";

import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  const [status, setStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalUsers: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // ==========================================
  // FETCH USERS
  // ==========================================

  useEffect(() => {
    fetchUsers();
  }, [currentPage, role, status]);

  const fetchUsers = async (isRefresh = false) => {
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

      if (role !== "all") {
        params.set("role", role);
      }

      if (status !== "all") {
        params.set("isActive", status === "active");
      }

      const response = await api.get(`/admin/users?${params.toString()}`);

      const data = response.data;

      if (data?.success) {
        setUsers(data.users || []);

        setPagination({
          totalUsers: data.totalUsers || 0,
          totalPages: data.totalPages || 1,
          hasNextPage: data.hasNextPage || false,
          hasPreviousPage: data.hasPreviousPage || false,
        });
      } else {
        setError("Unable to load users.");
      }
    } catch (err) {
      console.error("Admin users error:", err);

      setError(err?.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (event) => {
    event.preventDefault();

    setCurrentPage(1);

    fetchUsers();
  };

  // ==========================================
  // ROLE CHANGE
  // ==========================================

  const handleRoleChange = (event) => {
    setRole(event.target.value);

    setCurrentPage(1);
  };

  // ==========================================
  // STATUS CHANGE
  // ==========================================

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    setCurrentPage(1);
  };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    fetchUsers(true);
  };

  // ==========================================
  // ROLE ICON
  // ==========================================

  const getRoleIcon = (userRole) => {
    if (userRole === "admin") {
      return ShieldCheck;
    }

    if (userRole === "recruiter") {
      return Building2;
    }

    return UserRound;
  };

  // ==========================================
  // ROLE STYLE
  // ==========================================

  const getRoleStyle = (userRole) => {
    if (userRole === "admin") {
      return "bg-violet-50 text-violet-700 ring-violet-100";
    }

    if (userRole === "recruiter") {
      return "bg-blue-50 text-blue-700 ring-blue-100";
    }

    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  };

  // ==========================================
  // DATE FORMAT
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
  // LOADING
  // ==========================================

  if (loading) {
    return <UsersPageSkeleton />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* ==========================================
          PAGE HEADER
      =========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            User Management
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Users
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage students, recruiters and administrators across the StudentHub
            platform.
          </p>
        </div>

        {/* Total Users */}
        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Users size={18} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Total Users
            </p>

            <p className="text-lg font-bold text-slate-900">
              {pagination.totalUsers}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          ERROR
      =========================================== */}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-sm font-medium text-red-700">{error}</p>

          <button
            type="button"
            onClick={handleRefresh}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* ==========================================
          FILTER BAR
      =========================================== */}

      <motion.div
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
              placeholder="Search users by name or email..."
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

          {/* Role */}
          <FilterSelect
            value={role}
            onChange={handleRoleChange}
            options={[
              {
                value: "all",
                label: "All Roles",
              },
              {
                value: "student",
                label: "Students",
              },
              {
                value: "recruiter",
                label: "Recruiters",
              },
              {
                value: "admin",
                label: "Admins",
              },
            ]}
          />

          {/* Status */}
          <FilterSelect
            value={status}
            onChange={handleStatusChange}
            options={[
              {
                value: "all",
                label: "All Status",
              },
              {
                value: "active",
                label: "Active",
              },
              {
                value: "inactive",
                label: "Inactive",
              },
            ]}
          />

          {/* Refresh */}
          <button
            type="button"
            onClick={handleRefresh}
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
      </motion.div>

      {/* ==========================================
          USERS TABLE
      =========================================== */}

      <motion.div
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
        {users.length === 0 ? (
          <EmptyUsers />
        ) : (
          <>
            {/* Desktop Header */}
            <div className="hidden grid-cols-[minmax(240px,1.7fr)_130px_120px_150px_60px] gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:grid">
              <span>User</span>
              <span>Role</span>
              <span>Status</span>
              <span>Joined</span>
              <span />
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {users.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);

                return (
                  <motion.div
                    key={user._id}
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
                      lg:grid-cols-[minmax(240px,1.7fr)_130px_120px_150px_60px]
                      lg:items-center
                    "
                  >
                    {/* User */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white shadow-sm">
                        {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {user.fullName || "Unknown User"}
                        </p>

                        <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-slate-400">
                          <Mail size={12} className="shrink-0" />

                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-bold
                          capitalize
                          ring-1
                          ring-inset
                          ${getRoleStyle(user.role)}
                        `}
                      >
                        <RoleIcon size={12} />

                        {user.role}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold">
                        <span
                          className={`
                            h-2
                            w-2
                            rounded-full
                            ${
                              user.isActive
                                ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.10)]"
                                : "bg-slate-400"
                            }
                          `}
                        />

                        <span
                          className={
                            user.isActive
                              ? "text-emerald-600"
                              : "text-slate-500"
                          }
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </span>
                    </div>

                    {/* Joined */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <CalendarDays size={14} className="text-slate-400" />

                      {formatDate(user.createdAt)}
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={17} />
                      </button>
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
      </motion.div>

      <AdminUserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

// ==========================================
// FILTER SELECT
// ==========================================

const FilterSelect = ({ value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
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
          lg:w-[150px]
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
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

const EmptyUsers = () => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Users size={24} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">No users found</h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
        Try changing your search or filter criteria.
      </p>
    </div>
  );
};

// ==========================================
// LOADING SKELETON
// ==========================================

const UsersPageSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />

        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-20 animate-pulse rounded-2xl bg-white" />

      <div className="h-16 animate-pulse rounded-2xl bg-white" />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-20 animate-pulse border-b border-slate-100 bg-white"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
