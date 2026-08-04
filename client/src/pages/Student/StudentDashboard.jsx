import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/student.service";
import {
  FaBookOpen,
  FaFolderOpen,
  FaBriefcase,
  FaFileAlt,
  FaArrowUp,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentDashboard();

        if (data.success) {
          console.log("Student Dashboard Data:", data.dashboard);
          setDashboard(data.dashboard);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      id: 1,
      title: "My Projects",
      value: dashboard?.stats?.projects ?? 0,
      description: "Projects uploaded",
      icon: FaFolderOpen,
    },
    {
      id: 2,
      title: "My Notes",
      value: dashboard?.stats?.notes ?? 0,
      description: "Notes shared",
      icon: FaBookOpen,
    },
    {
      id: 3,
      title: "Applications",
      value: dashboard?.stats?.applications ?? 0,
      description: "Internships applied",
      icon: FaFileAlt,
    },
    {
      id: 4,
      title: "Student Score",
      value: dashboard?.stats?.score ?? 0,
      description: "Your contribution score",
      icon: FaBriefcase,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Student Overview
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Welcome back, {user?.fullName || "Student"}. Here's an overview of
              your activity and career progress.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
            Keep building your profile and exploring opportunities.
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                  <Icon />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                <FaArrowUp className="text-xs text-emerald-500" />

                <p className="text-sm text-slate-500">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Dashboard Content */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Profile Progress */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Complete Your Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A complete profile helps recruiters understand your skills.
              </p>
            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
              Profile
            </span>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Profile completion
              </span>
              <span className="text-sm font-bold text-indigo-600">
                {dashboard?.stats?.profileCompletion ?? 0}%
              </span>{" "}
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{
                  width: `${dashboard?.stats?.profileCompletion ?? 0}%`,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                dashboard?.stats?.profileCompletion === 100
                  ? "/student/profile"
                  : "/student/profile/edit",
              )
            }
            className="mt-7 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {dashboard?.stats?.profileCompletion === 100
              ? "View Profile"
              : "Complete Profile"}
          </button>
        </div>

        {/* Career Tip */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
          <p className="text-sm font-semibold text-indigo-100">CAREER TIP</p>

          <h2 className="mt-4 text-2xl font-bold leading-snug">
            Keep your StudentHub profile up to date.
          </h2>

          <p className="mt-4 leading-7 text-indigo-100">
            Add your skills, projects and resume so recruiters can discover your
            work and experience.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/profile/edit")}
            className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Update Profile
          </button>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Projects
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your latest projects on StudentHub.
              </p>
            </div>

            <FaFolderOpen className="text-xl text-indigo-600" />
          </div>

          {dashboard?.recentProjects?.length > 0 ? (
            <div className="mt-6 space-y-3">
              {dashboard.recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {project.category || "Project"}
                      </p>
                    </div>

                    <span className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-slate-500">
                      {project.viewsCount ?? 0} views
                    </span>
                  </div>

                  <div className="mt-3 flex gap-4 text-xs text-slate-400">
                    <span>{project.likesCount ?? 0} likes</span>

                    {project.createdAt && (
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-slate-50 px-5 py-10 text-center">
              <p className="font-medium text-slate-600">No projects yet.</p>

              <p className="mt-2 text-sm text-slate-400">
                Your recently uploaded projects will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Applications
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Track your latest internship applications.
              </p>
            </div>

            <FaFileAlt className="text-xl text-indigo-600" />
          </div>

          {dashboard?.recentApplications?.length > 0 ? (
            <div className="mt-6 space-y-3">
              {dashboard.recentApplications.map((application) => (
                <div
                  key={application._id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {application.internship?.title || "Internship"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {application.internship?.recruiter?.companyName ||
                          "Company"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        application.status === "Accepted"
                          ? "bg-emerald-100 text-emerald-700"
                          : application.status === "Shortlisted"
                            ? "bg-blue-100 text-blue-700"
                            : application.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : application.status === "Withdrawn"
                                ? "bg-slate-200 text-slate-600"
                                : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                    {application.internship?.workMode && (
                      <span>{application.internship.workMode}</span>
                    )}

                    {application.internship?.location && (
                      <span>{application.internship.location}</span>
                    )}

                    {application.appliedAt && (
                      <span>
                        Applied{" "}
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-slate-50 px-5 py-10 text-center">
              <p className="font-medium text-slate-600">No applications yet.</p>

              <p className="mt-2 text-sm text-slate-400">
                Your internship applications will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Notes */}
      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recent Notes</h2>

              <p className="mt-2 text-sm text-slate-500">
                Your recently shared study notes.
              </p>
            </div>

            <FaBookOpen className="text-xl text-indigo-600" />
          </div>

          {dashboard?.recentNotes?.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dashboard.recentNotes.map((note) => (
                <div
                  key={note._id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {note.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {note.subject || "Study Notes"}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                      <FaBookOpen />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
                    <span>{note.viewsCount ?? 0} views</span>

                    <span>{note.downloadsCount ?? 0} downloads</span>

                    {note.createdAt && (
                      <span>
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl bg-slate-50 px-5 py-10 text-center">
              <p className="font-medium text-slate-600">No notes yet.</p>

              <p className="mt-2 text-sm text-slate-400">
                Your recently shared notes will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
