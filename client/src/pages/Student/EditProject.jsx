import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import {
  getProjectById,
  updateStudentProject,
  updateStudentProjectImages,
} from "../../services/student.service";

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

const EditProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    techStack: "",
    githubUrl: "",
    liveDemoUrl: "",
    projectStatus: "Completed",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [updatingImages, setUpdatingImages] = useState(false);
  const [imageError, setImageError] = useState("");

  // Fetch existing project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(projectId);

        if (data.success) {
          const project = data.project;
          setCurrentImages(project.images || []);

          setFormData({
            title: project.title || "",
            description: project.description || "",
            category: project.category || "",
            techStack: project.techStack?.join(", ") || "",
            githubUrl: project.githubUrl || "",
            liveDemoUrl: project.liveDemoUrl || "",
            projectStatus: project.projectStatus || "Completed",
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setImageError("Maximum 5 project images are allowed.");
      setNewImages([]);
      e.target.value = "";
      return;
    }

    setImageError("");
    setNewImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data = await updateStudentProject(projectId, formData);

      if (data.success) {
        navigate(`/student/projects/${projectId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project.");
    } finally {
      setSaving(false);
    }
  };
  const handleUpdateImages = async () => {
    if (newImages.length === 0) {
      setImageError("Please select at least one image.");
      return;
    }

    try {
      setUpdatingImages(true);
      setImageError("");

      const data = await updateStudentProjectImages(projectId, newImages);

      if (data.success) {
        setCurrentImages(data.project.images || []);
        setNewImages([]);
      }
    } catch (err) {
      setImageError(
        err.response?.data?.message || "Failed to update project images.",
      );
    } finally {
      setUpdatingImages(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(`/student/projects/${projectId}`)}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Project
        </button>

        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Portfolio
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Edit Project</h1>

        <p className="mt-2 text-slate-500">Update your project information.</p>
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => navigate(`/student/projects/${projectId}`)}
            disabled={saving}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Project Images */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Project Images</h2>

          <p className="mt-2 text-sm text-slate-500">
            Replace the current project images with new ones.
          </p>
        </div>

        {/* Current Images */}
        {currentImages.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Current Images
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentImages.map((image, index) => (
                <div key={`${image}-${index}`}>
                  <img
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="h-40 w-full rounded-xl border border-slate-200 object-cover"
                  />

                  {index === 0 && (
                    <p className="mt-2 text-xs font-semibold text-indigo-600">
                      Current Thumbnail
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        <div className="mt-7">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select New Images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={updatingImages}
            className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-600"
          />

          <p className="mt-2 text-xs text-slate-400">
            Select 1 to 5 images. These will replace all current images.
          </p>

          {newImages.length > 0 && (
            <p className="mt-3 text-sm font-semibold text-emerald-600">
              {newImages.length} new image(s) selected
            </p>
          )}

          {imageError && (
            <p className="mt-3 text-sm font-medium text-red-600">
              {imageError}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleUpdateImages}
          disabled={updatingImages || newImages.length === 0}
          className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updatingImages ? "Updating Images..." : "Replace Images"}
        </button>
      </div>
    </div>
  );
};

export default EditProject;
