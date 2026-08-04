import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaIndustry,
  FaMapMarkerAlt,
  FaCamera,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

import {
  getRecruiterProfile,
  updateRecruiterProfile,
  uploadCompanyLogo,
  deleteCompanyLogo,
} from "../../services/recruiter.service";

const RecruiterProfile = () => {
  // ===========================
  // State
  // ===========================

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    location: "",
    description: "",
  });

  // ===========================
  // Load Profile
  // ===========================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getRecruiterProfile();

      if (data.success) {
        setProfile(data.profile);

        setFormData({
          companyName: data.profile.companyName || "",

          website: data.profile.website || "",

          industry: data.profile.industry || "",

          companySize: data.profile.companySize || "",

          location: data.profile.location || "",

          description: data.profile.description || "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Form Change
  // ===========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  // ===========================
  // Save Profile
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = await updateRecruiterProfile(formData);

      if (data.success) {
        setProfile(data.profile);

        alert(data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed.");
    } finally {
      setSaving(false);
    }
  };

  // ===========================
  // Upload Logo
  // ===========================

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploadingLogo(true);

      const data = await uploadCompanyLogo(file);

      if (data.success) {
        setProfile(data.profile);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Logo upload failed.");
    } finally {
      setUploadingLogo(false);
    }
  };

  // ===========================
  // Delete Logo
  // ===========================

  const handleDeleteLogo = async () => {
    try {
      const data = await deleteCompanyLogo();

      if (data.success) {
        setProfile(data.profile);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete logo.");
    }
  };

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="space-y-5">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  // ===========================
  // Error
  // ===========================

  if (error) {
    return (
      <Card className="border border-red-200 bg-red-50 text-red-600">
        {error}
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* ================= Hero Section ================= */}

      <Card className="overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
          {/* Left */}

          <div className="flex items-center gap-6">
            {/* Company Logo */}

            <div className="relative">
              {profile.companyLogo ? (
                <img
                  src={profile.companyLogo}
                  alt={profile.companyName}
                  className="h-32 w-32 rounded-3xl border-4 border-white object-cover shadow-xl"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white text-indigo-600 shadow-xl">
                  <FaBuilding className="text-5xl" />
                </div>
              )}

              <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-full bg-white p-3 text-indigo-600 shadow-lg transition hover:scale-110">
                <FaCamera />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleLogoUpload}
                />
              </label>
            </div>

            {/* Company Details */}

            <div>
              <h1 className="text-4xl font-bold">{profile.companyName}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2">
                  <FaIndustry />

                  {profile.industry || "Industry"}
                </span>

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt />

                  {profile.location || "Location"}
                </span>

                {profile.isVerifiedCompany && (
                  <Badge className="bg-green-100 text-green-700">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle />
                      Verified Company
                    </div>
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white/20 p-6 text-center backdrop-blur">
              <p className="text-sm opacity-80">Active Internships</p>

              <h2 className="mt-3 text-4xl font-bold">
                {profile.activeInternshipsCount}
              </h2>
            </div>

            <div className="rounded-2xl bg-white/20 p-6 text-center backdrop-blur">
              <p className="text-sm opacity-80">Total Hires</p>

              <h2 className="mt-3 text-4xl font-bold">{profile.totalHires}</h2>
            </div>
          </div>
        </div>
      </Card>

      {/* ================= Company Information ================= */}

      <Card>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Company Information</h2>

            <p className="mt-2 text-slate-500">Update your company profile.</p>
          </div>

          {profile.companyLogo && (
            <Button
              variant="secondary"
              type="button"
              onClick={handleDeleteLogo}
            >
              <FaTrash className="mr-2" />
              Delete Logo
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          {/* Company Name */}

          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />

          {/* Website */}

          <Input
            label="Website"
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://company.com"
          />

          {/* Industry */}

          <Input
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Software Development"
          />

          {/* Company Size */}

          <Input
            label="Company Size"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            placeholder="10 - 50 Employees"
          />

          {/* Location */}

          <div className="md:col-span-2">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Noida, Uttar Pradesh"
            />
          </div>

          {/* Company Description */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Company Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell students about your company..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Action Buttons */}

          <div className="col-span-2 mt-6 flex justify-end gap-4">
            {profile.companyLogo && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleDeleteLogo}
              >
                <FaTrash className="mr-2" />
                Delete Logo
              </Button>
            )}

            <Button type="submit" disabled={saving || uploadingLogo}>
              {saving
                ? "Saving..."
                : uploadingLogo
                  ? "Uploading..."
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RecruiterProfile;
