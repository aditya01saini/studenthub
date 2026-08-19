import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InternshipForm from "../../components/recruiter/InternshipForm";
import { createInternship } from "../../services/internship.service";

const CreateInternship = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const payload = {
        ...formData,
        stipend: Number(formData.stipend),
        openings: Number(formData.openings),
        skillsRequired: skills,
        perks,
      };

      const response = await createInternship(payload);

      if (response.success) {
        navigate("/recruiter/internships");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Create Internship
        </h1>

        <p className="mt-2 text-slate-500">
          Publish a new internship opportunity for students.
        </p>
      </div>

      <InternshipForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        skills={skills}
        setSkills={setSkills}
        perks={perks}
        setPerks={setPerks}
      />
    </div>
  );
};

export default CreateInternship;