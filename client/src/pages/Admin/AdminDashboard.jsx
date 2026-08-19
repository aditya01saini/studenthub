import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InternshipGrowthChart from "../../components/admin/InternshipGrowthChart";
import InternshipCategoryChart from "../../components/admin/InternshipCategoryChart";
import InternshipWorkModeChart from "../../components/admin/InternshipWorkModeChart";
import {
  Users,
  UserRoundCheck,
  BriefcaseBusiness,
  FileText,
  TrendingUp,
  Clock3,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import UserGrowthChart from "../../components/admin/UserGrowthChart";
import ApplicationStatusChart from "../../components/admin/ApplicationStatusChart";

import { getAdminDashboard } from "../../services/adminService";
import ApplicationGrowthChart from "../../components/admin/ApplicationGrowthChart";
const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // FETCH DASHBOARD
  // ==========================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminDashboard();

      if (data?.success) {
        setDashboard(data);
      } else {
        setError("Unable to load dashboard data.");
      }
    } catch (err) {
      console.error("Admin dashboard error:", err);

      setError(
        err?.response?.data?.message || "Failed to load admin dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return <DashboardSkeleton />;
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl border border-red-200 bg-red-50 p-6"
        >
          <div className="flex items-start gap-4">
            {/* Error Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <ShieldCheck size={20} />
            </div>

            {/* Error Content */}
            <div className="flex-1">
              <h2 className="font-semibold text-red-800">
                Dashboard unavailable
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchDashboard}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98]"
              >
                <RefreshCw size={15} />
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // BACKEND DATA
  // ==========================================

  const stats = dashboard?.stats || {};

  const users = stats.users || {};

  const recruiters = stats.recruiters || {};

  const internships = stats.internships || {};

  const applications = stats.applications || {};

  const analytics = dashboard?.analytics || {};

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      {/* ==========================================
          PAGE HEADER
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
          duration: 0.4,
        }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        {/* Heading */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Platform Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Good morning, Administrator
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor StudentHub activity, users, internships and applications
            from one place.
          </p>
        </div>

        {/* Live Status */}
        <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          <span className="text-xs font-semibold text-slate-600">
            Live data
          </span>
        </div>
      </motion.section>

      {/* ==========================================
          PRIMARY KPI CARDS
      =========================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Users"
          value={users.total}
          subtitle={`${users.students || 0} students`}
          icon={Users}
          iconClassName="bg-indigo-50 text-indigo-600"
          delay={0}
        />

        <AdminStatCard
          title="Recruiters"
          value={recruiters.total}
          subtitle={`${recruiters.verified || 0} verified`}
          icon={UserRoundCheck}
          iconClassName="bg-blue-50 text-blue-600"
          delay={0.05}
        />

        <AdminStatCard
          title="Internships"
          value={internships.total}
          subtitle={`${internships.open || 0} currently open`}
          icon={BriefcaseBusiness}
          iconClassName="bg-violet-50 text-violet-600"
          delay={0.1}
        />

        <AdminStatCard
          title="Applications"
          value={applications.total}
          subtitle={`${applications.pending || 0} pending review`}
          icon={FileText}
          iconClassName="bg-amber-50 text-amber-600"
          delay={0.15}
        />
      </section>

      {/* ==========================================
          SECONDARY KPI CARDS
      =========================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Active Users"
          value={users.active}
          subtitle={`${users.inactive || 0} inactive`}
          icon={TrendingUp}
          iconClassName="bg-emerald-50 text-emerald-600"
          delay={0.2}
        />

        <AdminStatCard
          title="Shortlisted"
          value={applications.shortlisted}
          subtitle={`${applications.shortlistRate || 0}% shortlist rate`}
          icon={Clock3}
          iconClassName="bg-sky-50 text-sky-600"
          delay={0.25}
        />

        <AdminStatCard
          title="Accepted"
          value={applications.accepted}
          subtitle={`${applications.acceptanceRate || 0}% acceptance rate`}
          icon={CheckCircle2}
          iconClassName="bg-green-50 text-green-600"
          delay={0.3}
        />

        <AdminStatCard
          title="Verified Recruiters"
          value={recruiters.verified}
          subtitle={`${recruiters.unverified || 0} awaiting verification`}
          icon={ShieldCheck}
          iconClassName="bg-purple-50 text-purple-600"
          delay={0.35}
        />
      </section>

      {/* ==========================================
          ANALYTICS
      =========================================== */}

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* User Growth */}
        <UserGrowthChart data={analytics.userGrowth || []} />

        {/* Application Status */}
        <ApplicationStatusChart data={analytics.applicationStatus || []} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <InternshipGrowthChart data={analytics.internshipGrowth || []} />

        <InternshipCategoryChart data={analytics.internshipCategories || []} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <InternshipWorkModeChart data={analytics.internshipWorkModes || []} />
      </section>

      {/* ==========================================
          PLATFORM SUMMARY
      =========================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.45,
        }}
        className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-6"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Platform Summary
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Current StudentHub platform health.
            </p>
          </div>

          <span className="w-fit rounded-lg bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-600">
            System Active
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem label="Open Internships" value={internships.open || 0} />

          <SummaryItem
            label="Closed Internships"
            value={internships.closed || 0}
          />

          <SummaryItem
            label="Pending Applications"
            value={applications.pending || 0}
          />

          <SummaryItem
            label="Featured Internships"
            value={internships.featured || 0}
          />
        </div>
      </motion.section>

      {/* ==========================================
    APPLICATION GROWTH + PLATFORM HEALTH
=========================================== */}

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ApplicationGrowthChart data={analytics.applicationGrowth || []} />

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Platform Health
            </h3>

            <p className="mt-1 text-[11px] text-slate-400">
              Current platform activity overview
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <HealthRow
              label="Active Users"
              value={users.active || 0}
              total={users.total || 1}
            />

            <HealthRow
              label="Open Internships"
              value={internships.open || 0}
              total={internships.total || 1}
            />

            <HealthRow
              label="Verified Recruiters"
              value={recruiters.verified || 0}
              total={recruiters.total || 1}
            />

            <HealthRow
              label="Accepted Applications"
              value={applications.accepted || 0}
              total={applications.total || 1}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const HealthRow = ({ label, value, total }) => {
  const percentage = Math.min(Math.round((value / total) * 100), 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>

        <span className="text-xs font-bold text-slate-800">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
        />
      </div>
    </div>
  );
};

// ==========================================
// SUMMARY ITEM
// ==========================================

const SummaryItem = ({ label, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-shadow duration-200 hover:shadow-sm"
    >
      <p className="text-xs font-medium text-slate-500">{label}</p>

      <p className="mt-2 text-xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </motion.div>
  );
};

// ==========================================
// DASHBOARD SKELETON
// ==========================================

const DashboardSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />

        <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200" />

        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
      </div>

      {/* Primary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="h-[360px] animate-pulse rounded-2xl border border-slate-200 bg-white" />

        <div className="h-[360px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>

      {/* Summary */}
      <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />
    </div>
  );
};

export default AdminDashboard;
