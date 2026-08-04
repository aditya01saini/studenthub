import { useEffect, useState } from "react";

import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

import { getRecruiterDashboard } from "../../services/recruiter.service";

const RecruiterDashboard = () => {
  // ===========================
  // States
  // ===========================

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ===========================
  // Fetch Dashboard
  // ===========================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getRecruiterDashboard();

      if (data.success) {
        setDashboard(data.dashboard);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  const profile = dashboard?.profile || {};

  const stats = dashboard?.stats || {};

  const recentInternships = dashboard?.recentInternships || [];

  const recentApplications = dashboard?.recentApplications || [];
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero */}

      <section className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
          Recruiter Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          Welcome, {profile.companyName}
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          Manage your internships, review applications and track your hiring
          progress from one place.
        </p>
      </section>

      {/* Statistics */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Total Internships</h3>
            <p className="mt-2 text-3xl font-bold">{stats.totalInternships}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Active Internships</h3>
            <p className="mt-2 text-3xl font-bold">{stats.activeInternships}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Closed Internships</h3>
            <p className="mt-2 text-3xl font-bold">{stats.closedInternships}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Total Applications</h3>
            <p className="mt-2 text-3xl font-bold">{stats.totalApplications}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Pending</h3>
            <p className="mt-2 text-3xl font-bold">{stats.pending}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Shortlisted</h3>
            <p className="mt-2 text-3xl font-bold">{stats.shortlisted}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Accepted</h3>
            <p className="mt-2 text-3xl font-bold">{stats.accepted}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h3 className="text-sm text-slate-500">Rejected</h3>
            <p className="mt-2 text-3xl font-bold">{stats.rejected}</p>
          </div>
        </div>
      </section>
      {/* Recent Internships */}

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Internships
          </h2>

          <span className="text-sm text-slate-500">
            {recentInternships.length} Internship(s)
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Work Mode
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Applicants
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentInternships.length > 0 ? (
                  recentInternships.map((internship) => (
                    <tr
                      key={internship._id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">{internship.title}</td>

                      <td className="px-6 py-4">{internship.category}</td>

                      <td className="px-6 py-4">{internship.workMode}</td>

                      <td className="px-6 py-4">
                        {internship.applicantsCount}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            internship.status === "Open"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {internship.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">
                      No internships found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recent Applications */}

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Applications
          </h2>

          <span className="text-sm text-slate-500">
            {recentApplications.length} Application(s)
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Internship
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.length > 0 ? (
                  recentApplications.map((application) => (
                    <tr
                      key={application._id}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">
                        {application.student?.user?.fullName}
                      </td>

                      <td className="px-6 py-4">
                        {application.internship?.title}
                      </td>

                      <td className="px-6 py-4">{application.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-slate-500">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruiterDashboard;
