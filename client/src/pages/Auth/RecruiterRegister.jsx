import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/auth.service";
import AuthLayout from "../../layouts/AuthLayout";

import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import PasswordInput from "../../components/auth/PasswordInput";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const RecruiterRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    email: "",
    website: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "recruiter",
        companyName: formData.companyName,
        website: formData.website,
      });

      if (data.success) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <AuthHeader
        title="Create Recruiter Account 🏢"
        subtitle="Hire talented students from StudentHub."
      />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          required
        />
        <Input
          label="Recruiter Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter recruiter name"
          required
        />
        <Input
          label="Official Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter official company email"
          required
        />
        <Input
          label="Company Website (Optional)"
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://company.com"
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Create Recruiter Account"}
        </Button>{" "}
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Login"
        to="/login"
      />
    </AuthLayout>
  );
};

export default RecruiterRegister;
