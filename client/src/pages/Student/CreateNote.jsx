import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaFilePdf,
  FaTimes,
} from "react-icons/fa";

import { createStudentNote } from "../../services/student.service";

const CreateNote = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    branch: "",
    semester: "",
    university: "",
    academicYear: "",
    tags: "",
    pdf: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    setError("");

    setFormData((prev) => ({
      ...prev,
      pdf: file,
    }));
  };

  const removePdf = () => {
    setFormData((prev) => ({
      ...prev,
      pdf: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pdf) {
      setError("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await createStudentNote(formData);

      if (data.success) {
        navigate("/student/notes");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to upload note. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() => navigate("/student/notes")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to My Notes
        </button>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
            Learning Resources
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Upload New Note
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Share useful study material with students on StudentHub.
          </p>
        </div>
      </div>

      {/* Form */}
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
              placeholder="e.g. Operating System Complete Notes"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
              placeholder="e.g. Operating System"
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
              placeholder="e.g. Computer Science"
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
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
              placeholder="Enter university or college name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
              placeholder="Briefly describe what these notes cover..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
              placeholder="OS, Process, Deadlock, Scheduling"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate multiple tags using commas.
            </p>
          </div>

          {/* PDF Upload */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Note PDF *
            </label>

            {!formData.pdf ? (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40 sm:py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl text-indigo-600">
                  <FaCloudUploadAlt />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Click to select your PDF
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Upload study notes in PDF format
                </p>

                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg text-red-500">
                    <FaFilePdf />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">
                      {formData.pdf.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {(formData.pdf.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removePdf}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove PDF"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/student/notes")}
            disabled={loading}
            className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Uploading..." : "Upload Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;