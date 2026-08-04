import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaFilePdf, FaSave } from "react-icons/fa";

import {
  getStudentNote,
  updateStudentNote,
} from "../../services/student.service";

const EditNote = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    branch: "",
    semester: "",
    university: "",
    academicYear: "",
    tags: "",
  });

  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentNote(noteId);

        if (data.success) {
          const note = data.note;

          setFormData({
            title: note.title || "",
            description: note.description || "",
            subject: note.subject || "",
            branch: note.branch || "",
            semester: note.semester || "",
            university: note.university || "",
            academicYear: note.academicYear || "",
            tags: note.tags?.join(", ") || "",
          });

          setPdfUrl(note.pdfUrl || "");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data = await updateStudentNote(noteId, formData);

      if (data.success) {
        navigate(`/student/notes/${noteId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() => navigate(`/student/notes/${noteId}`)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Note
        </button>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
            Manage Note
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Edit Note
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Update the information associated with your study note.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
      >
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Note Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Subject *
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Branch *
            </label>

            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Semester *
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select semester</option>

              {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Academic Year *
            </label>

            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              required
              placeholder="e.g. 2025-2026"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* University */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              University / College *
            </label>

            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="DBMS, SQL, Normalization"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate multiple tags using commas.
            </p>
          </div>

          {/* Existing PDF */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Current PDF
            </label>

            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg text-red-500">
                  <FaFilePdf />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700">
                    Existing Note PDF
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PDF replacement is not enabled for note editing.
                  </p>
                </div>
              </div>

              {pdfUrl && (
                <button
                  type="button"
                  onClick={() =>
                    window.open(pdfUrl, "_blank", "noopener,noreferrer")
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 sm:w-auto"
                >
                  View PDF
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/student/notes/${noteId}`)}
            disabled={saving}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <FaSave />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
