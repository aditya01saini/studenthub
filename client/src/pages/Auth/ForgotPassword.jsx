import { useState } from "react";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthFooter from "../../components/auth/AuthFooter";

import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          email: email.trim(),
        },
      );

      if (response.data.success) {
        setMessage(
          response.data.message ||
            "If an account exists with this email, a password reset link has been sent.",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your registered email address. We'll send you a password reset link."
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
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
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <AuthFooter text="Remember your password?" linkText="Login" to="/login" />
    </AuthLayout>
  );
};

export default ForgotPassword;
