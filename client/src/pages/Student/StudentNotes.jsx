import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaPlus,
  FaEye,
  FaDownload,
  FaFilePdf,
  FaArrowRight,
  FaSearch,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";

import { getMyNotes } from "../../services/student.service";

const StudentNotes = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const NOTES_PER_PAGE = 9;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyNotes();

        if (data.success) {
          setNotes(data.notes || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const totalViews = notes.reduce(
    (total, note) => total + (note.viewsCount || 0),
    0,
  );

  const totalDownloads = notes.reduce(
    (total, note) => total + (note.downloadsCount || 0),
    0,
  );

  const latestNote = notes.length > 0 ? notes[0] : null;

  const formatLastUploaded = (date) => {
    if (!date) return "No uploads";

    const uploadedDate = new Date(date);
    const now = new Date();

    const diffTime = now - uploadedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return uploadedDate.toLocaleDateString();
  };

  const subjects = [
    ...new Set(notes.map((note) => note.subject).filter(Boolean)),
  ];

  const semesters = [
    ...new Set(notes.map((note) => note.semester).filter(Boolean)),
  ];

  const filteredNotes = notes
    .filter((note) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        note.title?.toLowerCase().includes(searchValue) ||
        note.subject?.toLowerCase().includes(searchValue) ||
        note.branch?.toLowerCase().includes(searchValue) ||
        note.university?.toLowerCase().includes(searchValue) ||
        note.tags?.some((tag) => tag.toLowerCase().includes(searchValue));

      const matchesSubject =
        subjectFilter === "All" || note.subject === subjectFilter;

      const matchesSemester =
        semesterFilter === "All" || String(note.semester) === semesterFilter;

      return matchesSearch && matchesSubject && matchesSemester;
    })
    .sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "views") {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }

      if (sortBy === "downloads") {
        return (b.downloadsCount || 0) - (a.downloadsCount || 0);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);

  const startIndex = (currentPage - 1) * NOTES_PER_PAGE;

  const paginatedNotes = filteredNotes.slice(
    startIndex,
    startIndex + NOTES_PER_PAGE,
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, subjectFilter, semesterFilter, sortBy]);
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
            Learning Resources
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Notes
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage the study notes and resources you have shared with the
            StudentHub community.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/notes/new")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          <FaPlus />
          Upload Note
        </button>
      </section>

      {/* Statistics */}
      {!loading && !error && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Notes */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
              <FaBookOpen />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Total Notes</p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {notes.length}
              </h3>
            </div>
          </div>

          {/* Total Views */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">
              <FaEye />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">Total Views</p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {totalViews}
              </h3>
            </div>
          </div>

          {/* Total Downloads */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
              <FaDownload />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Total Downloads
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {totalDownloads}
              </h3>
            </div>
          </div>

          {/* Last Uploaded */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl text-orange-500">
              <FaCalendarAlt />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                Last Uploaded
              </p>

              <h3 className="mt-1 truncate text-base font-bold text-slate-900">
                {formatLastUploaded(latestNote?.createdAt)}
              </h3>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      {!loading && !error && notes.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[minmax(260px,1fr)_180px_160px_180px]">
            {/* Search */}
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Subject */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All Subjects</option>

              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            {/* Semester */}
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All Semesters</option>

              {semesters.map((semester) => (
                <option key={semester} value={String(semester)}>
                  Semester {semester}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="views">Most Viewed</option>
              <option value="downloads">Most Downloaded</option>
            </select>
          </div>
        </section>
      )}

      {/* Loading */}
      {loading && (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-200" />
              <div className="mt-5 h-5 w-2/3 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded bg-slate-100" />
              <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
            </div>
          ))}
        </section>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Notes */}
      {!loading && !error && notes.length > 0 && (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedNotes.map((note) => (
            <article
              key={note._id}
              className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md sm:p-6"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg text-red-500">
                  <FaFilePdf />
                </div>

                {note.semester && (
                  <span className="max-w-[150px] truncate rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    Semester {note.semester}
                  </span>
                )}
              </div>

              {/* Subject */}
              <p className="mt-5 truncate text-xs font-bold uppercase tracking-wider text-indigo-600">
                {note.subject || "Study Note"}
              </p>

              {/* Title */}
              <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-6 text-slate-900 sm:text-xl">
                {note.title}
              </h2>

              {/* Description */}
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                {note.description || "No description provided."}
              </p>

              {/* Information */}
              <div className="mt-5 space-y-2 text-sm text-slate-500">
                {note.branch && (
                  <div className="flex justify-between gap-3">
                    <span>Branch</span>
                    <span className="truncate font-medium text-slate-700">
                      {note.branch}
                    </span>
                  </div>
                )}

                {note.academicYear && (
                  <div className="flex justify-between gap-3">
                    <span>Academic Year</span>
                    <span className="font-medium text-slate-700">
                      {note.academicYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {note.tags?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="max-w-full truncate rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}

                  {note.tags.length > 3 && (
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Bottom */}
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <FaEye />
                    {note.viewsCount ?? 0}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FaDownload />
                    {note.downloadsCount ?? 0}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/student/notes/${note._id}`)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/student/notes/${note._id}/edit`)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <FaEdit />
                    Edit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Pagination */}
      {!loading && !error && filteredNotes.length > 0 && totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:px-5">
          {/* Result Information */}
          <p className="text-center text-sm text-slate-500 sm:text-left">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {startIndex + 1}
            </span>
            {" - "}
            <span className="font-semibold text-slate-700">
              {Math.min(startIndex + NOTES_PER_PAGE, filteredNotes.length)}
            </span>
            {" of "}
            <span className="font-semibold text-slate-700">
              {filteredNotes.length}
            </span>{" "}
            notes
          </p>

          {/* Pagination Controls */}
          <div className="flex max-w-full items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 shrink-0 rounded-lg text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && notes.length === 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm sm:px-8 sm:py-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600">
            <FaBookOpen />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
            No notes uploaded yet
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Share your study material with other students and build your
            StudentHub contribution profile.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/notes/new")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            <FaPlus />
            Upload Your First Note
          </button>
        </section>
      )}
    </div>
  );
};

export default StudentNotes;
