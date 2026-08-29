import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthFooter from "../../components/auth/AuthFooter";

import Button from "../../components/ui/Button";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
    setMessage("");

    // Token check
    if (!token) {
      setError("Invalid or missing password reset link.");
      return;
    }

    // Password check
    if (!formData.password) {
      setError("Please enter your new password.");
      return;
    }

    // Minimum password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-password/${token}`,
        {
          password: formData.password,
        },
      );

      if (response.data.success) {
        setMessage(
          response.data.message ||
            "Password reset successfully. You can now login.",
        );

        // Clear form
        setFormData({
          password: "",
          confirmPassword: "",
        });

        // Login page par redirect
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. The link may be invalid or expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Password 🔒"
        subtitle="Create a new password for your StudentHub account."
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <PasswordInput
          label="New Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your new password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your new password"
          required
        />

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {message && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
            {message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>

      <AuthFooter text="Remember your password?" linkText="Login" to="/login" />
    </AuthLayout>
  );
};

export default ResetPassword;
