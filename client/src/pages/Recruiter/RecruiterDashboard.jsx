import { useEffect, useState } from "react";

import {
  BriefcaseBusiness,
  Briefcase,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  PlusCircle,
} from "lucide-react";

import { getRecruiterDashboard } from "../../services/recruiter.service";

import StatCard from "../../components/recruiter/StatCard";
import QuickActionCard from "../../components/recruiter/QuickActionCard";
import RecentInternshipTable from "../../components/recruiter/RecentInternshipTable";
import RecentApplicationTable from "../../components/recruiter/RecentApplicationTable";

const RecruiterDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getRecruiterDashboard();

      setDashboard(response.dashboard);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-slate-500">Loading Dashboard...</p>
      </div>
    );
  }

  const { profile, stats, recentInternships, recentApplications } = dashboard;

  return (
    <div className="space-y-8">
      {/* ================= Hero ================= */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 p-8 text-white shadow-xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          {/* Left */}
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Recruiter Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Welcome, {profile.companyName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {profile.isVerified && (
                <span className="rounded-full bg-green-500 px-4 py-1 text-sm font-semibold text-white">
                  ✓ Verified Recruiter
                </span>
              )}

              {profile.industry && (
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
                  {profile.industry}
                </span>
              )}

              {profile.location && (
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
                  {profile.location}
                </span>
              )}
            </div>

            <p className="mt-6 max-w-2xl text-indigo-100">
              Track internships, manage applications and hire talented students
              from one powerful dashboard.
            </p>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <div className="rounded-3xl bg-white p-2 shadow-lg">
              <img
                src={
                  profile.companyLogo ||
                  "https://ui-avatars.com/api/?name=Company"
                }
                alt={profile.companyName}
                className="h-36 w-36 rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ================= Quick Actions ================= */}

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>

          <p className="mt-1 text-slate-500">
            Frequently used recruiter actions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <QuickActionCard
            title="Post New Internship"
            description="Create and publish a new internship opportunity for students."
            icon={PlusCircle}
            to="/recruiter/internships/create"
            color="indigo"
          />

          <QuickActionCard
            title="Manage Applications"
            description="Review applicants, shortlist candidates and update application status."
            icon={Users}
            to="/recruiter/applications"
            color="green"
          />
        </div>
      </section>

      {/* ================= Statistics ================= */}

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Dashboard Statistics
          </h2>

          <p className="mt-1 text-slate-500">
            Overview of your internships and hiring progress.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Internships"
            value={stats.totalInternships}
            icon={BriefcaseBusiness}
            color="indigo"
          />

          <StatCard
            title="Active Internships"
            value={stats.activeInternships}
            icon={Briefcase}
            color="green"
          />

          <StatCard
            title="Closed Internships"
            value={stats.closedInternships}
            icon={XCircle}
            color="red"
          />

          <StatCard
            title="Applications"
            value={stats.totalApplications}
            icon={FileText}
            color="blue"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={Clock3}
            color="yellow"
          />

          <StatCard
            title="Shortlisted"
            value={stats.shortlisted}
            icon={Users}
            color="blue"
          />

          <StatCard
            title="Accepted"
            value={stats.accepted}
            icon={CheckCircle2}
            color="green"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            color="red"
          />
        </div>
      </section>

      {/* ================= Recent Internships ================= */}

      <section>
        <RecentInternshipTable internships={recentInternships} />
      </section>

      {/* ================= Recent Applications ================= */}

      <section>
        <RecentApplicationTable applications={recentApplications} />
      </section>
    </div>
  );
};

export default RecruiterDashboard;
