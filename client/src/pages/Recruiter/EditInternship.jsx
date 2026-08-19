import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InternshipForm from "../../components/recruiter/InternshipForm";

import {
  getInternship,
  updateInternship,
} from "../../services/internship.service";

const EditInternship = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [skills, setSkills] = useState([]);
  const [perks, setPerks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    workMode: "",
    location: "",
    stipend: "",
    duration: "",
    experience: "Fresher",
    openings: "",
    startDate: "",
    applicationDeadline: "",
    certificateProvided: false,
  });

  useEffect(() => {
    fetchInternship();
  }, []);

  const fetchInternship = async () => {
    try {
      const response = await getInternship(id);

      const internship = response.internship;

      setFormData({
        title: internship.title || "",
        description: internship.description || "",
        category: internship.category || "",
        workMode: internship.workMode || "",
        location: internship.location || "",
        stipend: internship.stipend || "",
        duration: internship.duration || "",
        experience: internship.experience || "Fresher",
        openings: internship.openings || "",
        startDate: internship.startDate
          ? internship.startDate.split("T")[0]
          : "",
        applicationDeadline: internship.applicationDeadline
          ? internship.applicationDeadline.split("T")[0]
          : "",
        certificateProvided: internship.certificateProvided || false,
      });

      setSkills(internship.skillsRequired || []);
      setPerks(internship.perks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateInternship(id, {
        ...formData,
        stipend: Number(formData.stipend),
        openings: Number(formData.openings),
        skillsRequired: skills,
        perks,
      });

      navigate("/recruiter/internships");
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Loading internship...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Internship</h1>

        <p className="mt-2 text-slate-500">Update your internship details.</p>
      </div>

      <InternshipForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={saving}
        skills={skills}
        setSkills={setSkills}
        perks={perks}
        setPerks={setPerks}
      />
    </div>
  );
};

export default EditInternship;
