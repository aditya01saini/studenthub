import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

import {
  getStudentProfile,
  updateStudentProfile,
} from "../../services/student.service";

const EditStudentProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    college: "",
    course: "",
    graduationYear: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentProfile();

        if (data.success) {
          const profile = data.profile;

          setFormData({
            college: profile.college || "",
            course: profile.course || "",
            graduationYear: profile.graduationYear || "",
            bio: profile.bio || "",
            skills: profile.skills?.join(", ") || "",
            github: profile.github || "",
            linkedin: profile.linkedin || "",
            portfolio: profile.portfolio || "",
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

      const payload = {
        ...formData,

        graduationYear: formData.graduationYear
          ? Number(formData.graduationYear)
          : undefined,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const data = await updateStudentProfile(payload);

      if (data.success) {
        navigate("/student/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/student/profile")}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <FaArrowLeft />
          Back to Profile
        </button>

        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Profile Settings
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Edit Profile</h1>

        <p className="mt-2 text-slate-500">
          Update your academic and professional information.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        {/* Academic */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Academic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add information about your education.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                College / University
              </label>

              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter college or university"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course
              </label>

              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Graduation Year
              </label>

              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="2027"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-slate-200" />

        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">About You</h2>

          <div className="mt-6 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                placeholder="Tell recruiters and students about yourself..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, Express, MongoDB"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Separate each skill using a comma.
              </p>
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-slate-200" />

        {/* Links */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Professional Links
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                GitHub
              </label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Portfolio
              </label>

              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-4 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => navigate("/student/profile")}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentProfile;
