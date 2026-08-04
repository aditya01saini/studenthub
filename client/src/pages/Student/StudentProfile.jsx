import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getStudentProfile,
  uploadStudentProfileImage,
  deleteStudentProfileImage,
  uploadStudentResume,
  deleteStudentResume,
} from "../../services/student.service";

import {
  FaUser,
  FaUniversity,
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";

const StudentProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeError, setResumeError] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStudentProfile();

        if (data.success) {
          setProfile(data.profile);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load student profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);
      setImageError("");

      const data = await uploadStudentProfileImage(file);

      if (data.success) {
        setProfile((prev) => ({
          ...prev,
          profileImage:
            data.profile?.profileImage ||
            data.profileImage ||
            prev.profileImage,
        }));
      }
    } catch (err) {
      setImageError(
        err.response?.data?.message || "Failed to upload profile image.",
      );
    } finally {
      setUploadingImage(false);

      // Same image ko dobara select karne ki permission
      e.target.value = "";
    }
  };

  const handleImageDelete = async () => {
    try {
      setUploadingImage(true);
      setImageError("");

      const data = await deleteStudentProfileImage();

      if (data.success) {
        setProfile((prev) => ({
          ...prev,
          profileImage: "",
        }));
      }
    } catch (err) {
      setImageError(
        err.response?.data?.message || "Failed to remove profile image.",
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Frontend validation
    if (file.type !== "application/pdf") {
      setResumeError("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingResume(true);
      setResumeError("");

      const data = await uploadStudentResume(file);

      if (data.success) {
        // Backend response structure ko guess karne ke bajay
        // latest profile dobara fetch kar rahe hain.
        const updatedData = await getStudentProfile();

        if (updatedData.success) {
          setProfile(updatedData.profile);
        }
      }
    } catch (err) {
      setResumeError(err.response?.data?.message || "Failed to upload resume.");
    } finally {
      setUploadingResume(false);
      e.target.value = "";
    }
  };

  const handleResumeDelete = async () => {
    try {
      setUploadingResume(true);
      setResumeError("");

      const data = await deleteStudentResume();

      if (data.success) {
        setProfile((prev) => ({
          ...prev,
          resume: "",
        }));
      }
    } catch (err) {
      setResumeError(err.response?.data?.message || "Failed to remove resume.");
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
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
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            My Profile
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Student Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your academic and professional information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/profile/edit")}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col items-start gap-3">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile?.user?.fullName || "Student"}
                className="h-24 w-24 rounded-2xl border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-100 text-4xl text-indigo-600">
                <FaUser />
              </div>
            )}

            <label
              className={`cursor-pointer text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 ${
                uploadingImage ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {uploadingImage ? "Uploading..." : "Change Photo"}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>

            {profile?.profileImage && (
              <button
                type="button"
                onClick={handleImageDelete}
                disabled={uploadingImage}
                className="text-sm font-semibold text-red-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove Photo
              </button>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {profile?.user?.fullName || "Student"}
            </h2>

            <p className="mt-1 text-slate-500">{profile?.user?.email}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium capitalize text-indigo-600">
                {profile?.user?.role}
              </span>

              {profile?.user?.isVerified && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Academic Information
          </h2>

          <div className="mt-6 space-y-5">
            <div className="flex items-start gap-4">
              <FaUniversity className="mt-1 text-xl text-indigo-600" />

              <div>
                <p className="text-sm text-slate-500">College / University</p>

                <p className="mt-1 font-semibold text-slate-800">
                  {profile?.college || "Not added"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaGraduationCap className="mt-1 text-xl text-indigo-600" />

              <div>
                <p className="text-sm text-slate-500">Course</p>

                <p className="mt-1 font-semibold text-slate-800">
                  {profile?.course || "Not added"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500">Graduation Year</p>

              <p className="mt-1 font-semibold text-slate-800">
                {profile?.graduationYear || "Not added"}
              </p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">About Me</h2>

          <p className="mt-5 leading-7 text-slate-600">
            {profile?.bio || "No bio added yet."}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Skills</h2>

        <div className="mt-5 flex flex-wrap gap-3">
          {profile?.skills?.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500">No skills added yet.</p>
          )}
        </div>
      </div>

      {/* Professional Links */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Professional Links</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <FaGithub className="text-xl" />
            <span>{profile?.github || "GitHub not added"}</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <FaLinkedin className="text-xl text-blue-600" />
            <span>{profile?.linkedin || "LinkedIn not added"}</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <FaGlobe className="text-xl text-indigo-600" />
            <span>{profile?.portfolio || "Portfolio not added"}</span>
          </div>

          {resumeError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {resumeError}
            </div>
          )}

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <FaFileAlt className="mt-1 text-xl text-emerald-600" />

              <div className="flex-1">
                <p className="font-semibold text-slate-800">Resume</p>

                <p className="mt-1 text-sm text-slate-500">
                  {profile?.resume
                    ? "Your resume is uploaded."
                    : "Upload your resume in PDF format."}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {/* Upload / Replace */}
                  <label
                    className={`cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 ${
                      uploadingResume ? "pointer-events-none opacity-60" : ""
                    }`}
                  >
                    {uploadingResume
                      ? "Processing..."
                      : profile?.resume
                        ? "Replace Resume"
                        : "Upload Resume"}

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResumeUpload}
                      disabled={uploadingResume}
                      className="hidden"
                    />
                  </label>

                  {/* View */}
                  {profile?.resume && (
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white"
                    >
                      View Resume
                    </a>
                  )}

                  {/* Remove */}
                  {profile?.resume && (
                    <button
                      type="button"
                      onClick={handleResumeDelete}
                      disabled={uploadingResume}
                      className="rounded-lg px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
