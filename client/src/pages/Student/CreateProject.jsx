import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { createStudentProject } from "../../services/student.service";

const categories = [
  "Web Development",
  "Mobile App",
  "AI/ML",
  "Data Science",
  "Blockchain",
  "Cyber Security",
  "IoT",
  "Desktop Application",
  "Game Development",
  "Other",
];

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    techStack: "",
    githubUrl: "",
    liveDemoUrl: "",
    projectStatus: "Completed",
  });

  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      setError("Maximum 5 project images are allowed.");
      e.target.value = "";
      return;
    }

    setError("");
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setError("Please upload at least one project image.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const data = await createStudentProject({
        ...formData,
        images,
      });

      if (data.success) {
        navigate("/student/projects");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/student/projects")}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Projects
        </button>

        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Portfolio
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Add New Project
        </h1>

        <p className="mt-2 text-slate-500">
          Showcase your work, technologies and project details.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project Title *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={150}
            required
            placeholder="e.g. StudentHub Platform"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description *
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={3000}
            required
            rows={6}
            placeholder="Describe what your project does..."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Category + Tech Stack */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tech Stack
            </label>

            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate technologies using commas.
            </p>
          </div>
        </div>

        {/* Project Status */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project Status *
          </label>

          <select
            name="projectStatus"
            value={formData.projectStatus}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>

          <p className="mt-2 text-xs text-slate-400">
            Select the current development status of your project.
          </p>
        </div>

        {/* URLs */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              GitHub Repository URL *
            </label>

            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              required
              placeholder="https://github.com/username/project"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Live Demo URL
            </label>

            <input
              type="url"
              name="liveDemoUrl"
              value={formData.liveDemoUrl}
              onChange={handleChange}
              placeholder="https://yourproject.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project Images *
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 transition hover:border-indigo-400 hover:bg-indigo-50/40">
            <FaCloudUploadAlt className="text-4xl text-indigo-500" />

            <p className="mt-3 font-semibold text-slate-700">
              Choose project images
            </p>

            <p className="mt-1 text-sm text-slate-400">Upload 1 to 5 images</p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <p className="mt-3 text-sm font-medium text-emerald-600">
              {images.length} image(s) selected
            </p>
          )}

          <p className="mt-2 text-xs text-slate-400">
            The first image will be used as the project thumbnail.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => navigate("/student/projects")}
            disabled={submitting}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Uploading Project..." : "Publish Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
