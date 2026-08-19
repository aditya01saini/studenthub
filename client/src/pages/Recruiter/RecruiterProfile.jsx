import { useEffect, useState } from "react";

import {
  getRecruiterProfile,
  updateRecruiterProfile,
  uploadCompanyLogo,
  deleteCompanyLogo,
} from "../../services/recruiter.service";

import CompanyLogoCard from "../../components/recruiter/CompanyLogoCard";
import CompanyInfoForm from "../../components/recruiter/CompanyInfoForm";
import CompanyStatsCard from "../../components/recruiter/CompanyStatsCard";

const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getRecruiterProfile();

      const data = response.profile;

      setProfile(data);

      setFormData({
        companyName: data.companyName || "",
        website: data.website || "",
        industry: data.industry || "",
        companySize: data.companySize || "",
        location: data.location || "",
        description: data.description || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateRecruiterProfile(formData);

      await fetchProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    await uploadCompanyLogo(file);

    await fetchProfile();
  };

  const handleLogoDelete = async () => {
    await deleteCompanyLogo();

    await fetchProfile();
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Recruiter Profile</h1>

        <p className="mt-2 text-slate-500">
          Manage your company information and profile settings.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-8">
          <CompanyLogoCard
            companyLogo={profile.companyLogo}
            companyName={profile.companyName}
            onUpload={handleLogoUpload}
            onDelete={handleLogoDelete}
          />

          <CompanyStatsCard
            isVerifiedCompany={profile.isVerifiedCompany}
            activeInternshipsCount={profile.activeInternshipsCount}
            totalHires={profile.totalHires}
          />
        </div>

        {/* Right */}
        <div className="lg:col-span-2">
          <CompanyInfoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={saving}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
