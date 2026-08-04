import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import AuthLayout from "../../layouts/AuthLayout";

import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import PasswordInput from "../../components/auth/PasswordInput";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      setLoading(true);

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        login(data.user, data.token);

        if (data.user.role === "student") {
          navigate("/student/dashboard");
        } else if (data.user.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Login to continue your learning journey with StudentHub."
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        {/* Remember */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4 accent-indigo-600" />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Forgot Password?
          </Link>
        </div>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>{" "}
      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-slate-200"></div>

        <span className="px-4 text-sm text-slate-500">OR</span>

        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      {/* Google */}

      <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 py-3 font-semibold transition hover:border-indigo-600 hover:text-indigo-600">
        <FaGoogle />
        Continue with Google
      </button>

      <AuthFooter
        text="Don't have an account?"
        linkText="Create Account"
        to="/register"
      />
    </AuthLayout>
  );
};

export default Login;
