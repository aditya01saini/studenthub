import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaArrowLeft,
  FaCode,
  FaBookOpen,
  FaEye,
  FaDownload,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaLayerGroup,
  FaMapMarkerAlt,
} from "react-icons/fa";

import api from "../../services/api";

const PublicStudentProfile = () => {
  const { studentId } = useParams();

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const [profileResponse, projectsResponse, notesResponse] =
        await Promise.all([
          api.get(`/student/${studentId}`),

          api.get(`/student/${studentId}/projects`, {
            params: {
              page: 1,
              limit: 6,
            },
          }),

          api.get(`/student/${studentId}/notes`, {
            params: {
              page: 1,
              limit: 6,
            },
          }),
        ]);

      setProfile(profileResponse.data.portfolio || null);
      setProjects(projectsResponse.data.projects || []);
      setNotes(notesResponse.data.notes || []);
    } catch (error) {
      console.error("Failed to fetch student profile:", error);

      setError(
        error?.response?.data?.message || "Unable to load student profile.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchProfile();
    }
  }, [studentId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="h-32 animate-pulse bg-slate-200" />

            <div className="px-8 py-8">
              <div className="flex items-center gap-5">
                <div className="h-28 w-28 animate-pulse rounded-2xl bg-slate-200" />

                <div className="space-y-3">
                  <div className="h-7 w-52 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FaGraduationCap className="text-2xl" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Student Profile Not Found
            </h2>

            <p className="mt-2 text-slate-500">
              {error || "This student profile is not available."}
            </p>

            <Link
              to="/students"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <FaArrowLeft />
              Back to Students
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = profile.stats || {};

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ==========================================
            BACK
        ========================================== */}

        <Link
          to="/students"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Students
        </Link>

        {/* ==========================================
            PROFESSIONAL PROFILE HERO
        ========================================== */}

        {/* ==========================================
    PROFESSIONAL PROFILE HERO
========================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover Banner */}

          <div className="relative h-36 overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute left-1/2 -bottom-32 h-72 w-72 rounded-full border border-white/10" />

            <div className="absolute right-1/4 top-8 h-16 w-16 rounded-full bg-white/5" />
          </div>

          {/* Profile Main */}

          <div className="px-6 py-7 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              {/* ==========================================
          STUDENT INFORMATION
      ========================================== */}

              <div className="flex min-w-0 items-center gap-5">
                {/* Profile Image */}

                <div className="shrink-0">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.fullName}
                      className="h-24 w-24 rounded-2xl border border-slate-200 bg-white object-cover shadow-md sm:h-28 sm:w-28"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-50 sm:h-28 sm:w-28">
                      <FaCode className="text-4xl text-indigo-600" />
                    </div>
                  )}
                </div>

                {/* Student Details */}

                <div className="min-w-0">
                  {/* Name */}

                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {profile.fullName}
                    </h1>

                    {profile.isVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                        <FaCheckCircle />
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Course */}

                  <p className="mt-1 font-semibold text-indigo-600">
                    {profile.course || "Student"}
                  </p>

                  {/* College */}

                  {profile.college && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <FaGraduationCap className="shrink-0 text-slate-400" />

                      <span className="truncate">{profile.college}</span>
                    </p>
                  )}

                  {/* Graduation */}

                  {profile.graduationYear &&
                    Number(profile.graduationYear) > 0 && (
                      <p className="mt-1 text-xs text-slate-400">
                        Graduation: {profile.graduationYear}
                      </p>
                    )}
                </div>
              </div>

              {/* ==========================================
          SOCIAL BUTTONS
      ========================================== */}

              <div className="flex flex-wrap gap-2">
                {profile.github && (
                  <SocialButton
                    href={profile.github}
                    icon={<FaGithub />}
                    label="GitHub"
                  />
                )}

                {profile.linkedin && (
                  <SocialButton
                    href={profile.linkedin}
                    icon={<FaLinkedin />}
                    label="LinkedIn"
                  />
                )}

                {profile.portfolio && (
                  <SocialButton
                    href={profile.portfolio}
                    icon={<FaGlobe />}
                    label="Portfolio"
                    primary
                  />
                )}
              </div>
            </div>

            {/* ==========================================
        ABOUT
    ========================================== */}

            {profile.bio && (
              <div className="mt-7 border-t border-slate-100 pt-6">
                <h2 className="text-lg font-bold text-slate-900">About Me</h2>

                <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
                  {profile.bio}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ==========================================
            STATISTICS
        ========================================== */}

        <section className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-4">
          <ProfileStat
            icon={<FaCode />}
            value={stats.projects || 0}
            label="Projects"
          />

          <ProfileStat
            icon={<FaBookOpen />}
            value={stats.notes || 0}
            label="Notes"
          />

          <ProfileStat
            icon={<FaEye />}
            value={stats.projectViews || 0}
            label="Project Views"
          />

          <ProfileStat
            icon={<FaDownload />}
            value={stats.noteDownloads || 0}
            label="Downloads"
          />
        </section>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
          {/* ==========================================
              MAIN
          ========================================== */}

          <main className="space-y-5">
            {/* ==========================================
                PROJECTS
            ========================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<FaCode />}
                title="Projects"
                subtitle="Projects created and shared by this student"
              />

              {projects.length === 0 ? (
                <EmptyState message="No projects available yet." />
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              )}
            </section>

            {/* ==========================================
                NOTES
            ========================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<FaBookOpen />}
                title="Notes"
                subtitle="Notes and study material shared by this student"
              />

              {notes.length === 0 ? (
                <EmptyState message="No notes available yet." />
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {notes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                  ))}
                </div>
              )}
            </section>
          </main>

          {/* ==========================================
              SIDEBAR
          ========================================== */}

          <aside className="space-y-5">
            {/* SKILLS */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FaLayerGroup />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">Skills</h2>

                  <p className="text-xs text-slate-500">Technical expertise</p>
                </div>
              </div>

              {profile.skills?.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-slate-400">
                  No skills added yet.
                </p>
              )}
            </section>

            {/* QUICK INFO */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-slate-900">Quick Information</h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Course"
                  value={profile.course || "Not specified"}
                />

                <InfoRow
                  label="College"
                  value={profile.college || "Not specified"}
                />

                <InfoRow
                  label="Graduation"
                  value={profile.graduationYear || "Not specified"}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SOCIAL BUTTON
// ==========================================

const SocialButton = ({ href, icon, label, primary = false }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
        primary
          ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
          : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      {icon}
      {label}
      <FaExternalLinkAlt className="text-[10px] opacity-50" />
    </a>
  );
};

// ==========================================
// STAT
// ==========================================

const ProfileStat = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 p-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div>
        <p className="text-xl font-bold text-slate-900">
          {Number(value).toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
};

// ==========================================
// SECTION HEADER
// ==========================================

const SectionHeader = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>

        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};

// ==========================================
// PROJECT CARD
// ==========================================

const ProjectCard = ({ project }) => {
  return (
    <div className="group rounded-xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-bold text-slate-900 group-hover:text-indigo-600">
            {project.title}
          </h3>

          <p className="mt-1 text-xs font-medium text-indigo-600">
            {project.category || "Project"}
          </p>
        </div>

        {project.featured && (
          <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
            Featured
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {project.description}
      </p>

      {project.techStack?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex gap-4 text-xs text-slate-400">
          <span>{project.viewsCount || 0} views</span>

          <span>{project.likesCount || 0} likes</span>
        </div>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
};

// ==========================================
// NOTE CARD
// ==========================================

const NoteCard = ({ note }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      <h3 className="font-bold text-slate-900">{note.title}</h3>

      <p className="mt-2 text-sm font-semibold text-indigo-600">
        {note.subject}
      </p>

      <p className="mt-1 text-xs text-slate-500">{note.university}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
        <span>{note.viewsCount || 0} views</span>

        <span>{note.downloadsCount || 0} downloads</span>
      </div>
    </div>
  );
};

// ==========================================
// INFO ROW
// ==========================================

const InfoRow = ({ label, value }) => {
  return (
    <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
};

// ==========================================
// EMPTY STATE
// ==========================================

const EmptyState = ({ message }) => {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
};

export default PublicStudentProfile;
