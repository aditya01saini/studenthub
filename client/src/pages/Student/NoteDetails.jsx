import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaDownload,
  FaEye,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGraduationCap,
  FaUniversity,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getStudentNote,
  downloadStudentNote,
  deleteStudentNote,
} from "../../services/student.service";
import { useAuth } from "../../context/AuthContext";

const NoteDetails = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { user } = useAuth();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentNote(noteId);

        if (data.success) {
          setNote(data.note);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load note details.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setError("");

      const data = await downloadStudentNote(noteId);

      if (data.success && data.downloadUrl) {
        setNote((prev) => ({
          ...prev,
          downloadsCount: data.downloadsCount,
        }));

        window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to download note.");
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      const data = await deleteStudentNote(noteId);

      if (data.success) {
        navigate("/student/notes");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete note.");

      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="animate-pulse space-y-5">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="h-48 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (error && !note) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/student/notes")}
            className="mt-4 text-sm font-semibold text-red-700 underline"
          >
            Back to My Notes
          </button>
        </div>
      </div>
    );
  }

  if (!note) return null;

  const isOwner =
    user?._id &&
    note?.uploadedBy?.user?._id &&
    String(user._id) === String(note.uploadedBy.user._id);
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Page Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate("/student/notes")}
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to My Notes
        </button>
        {isOwner && (
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(`/student/notes/${noteId}/edit`)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 sm:flex-none"
            >
              <FaEdit />
              Edit Note
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:flex-none"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Hero */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                  {note.subject || "Study Note"}
                </span>

                {note.semester && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Semester {note.semester}
                  </span>
                )}
              </div>

              <h1 className="mt-4 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {note.title}
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                {note.description || "No description provided."}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <FaEye />
                  {note.viewsCount ?? 0} views
                </span>

                <span className="flex items-center gap-2">
                  <FaDownload />
                  {note.downloadsCount ?? 0} downloads
                </span>

                {note.createdAt && (
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-3xl text-red-500">
              <FaFilePdf />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left */}
        <div className="space-y-6">
          {/* Academic Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Academic Details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FaBookOpen />
                  Subject
                </div>

                <p className="mt-2 break-words font-semibold text-slate-800">
                  {note.subject || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FaGraduationCap />
                  Branch
                </div>

                <p className="mt-2 break-words font-semibold text-slate-800">
                  {note.branch || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FaUniversity />
                  University
                </div>

                <p className="mt-2 break-words font-semibold text-slate-800">
                  {note.university || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <FaCalendarAlt />
                  Academic Year
                </div>

                <p className="mt-2 font-semibold text-slate-800">
                  {note.academicYear || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Topics & Tags</h2>

            {note.tags?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No tags added to this note.
              </p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-500">
            <FaFilePdf />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">Note PDF</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            View the study material online or download the PDF.
          </p>

          <div className="mt-6 space-y-3">
            {note.pdfUrl && (
              <button
                type="button"
                onClick={() =>
                  window.open(note.pdfUrl, "_blank", "noopener,noreferrer")
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                <FaExternalLinkAlt />
                View PDF
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading || !note.pdfUrl}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaDownload />
              {downloading ? "Opening..." : "Download PDF"}
            </button>
          </div>

          {/* Uploader */}
          {note.uploadedBy && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Uploaded By
              </p>

              <div className="mt-3 flex items-center gap-3">
                {note.uploadedBy.profileImage ? (
                  <img
                    src={note.uploadedBy.profileImage}
                    alt={note.uploadedBy.user?.fullName || "Student"}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {note.uploadedBy.user?.fullName?.charAt(0)?.toUpperCase() ||
                      "S"}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {note.uploadedBy.user?.fullName || "Student"}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {note.uploadedBy.college ||
                      note.uploadedBy.course ||
                      "StudentHub Student"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-600">
              <FaExclamationTriangle />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Delete this note?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">{note.title}</span>
              ? This note will no longer appear in your notes.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaTrash />

                {deleting ? "Deleting..." : "Delete Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
