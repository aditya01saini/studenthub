import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  UserRound,
  Mail,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  Save,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";

const AdminSettings = () => {
  // ==========================================
  // USER
  // ==========================================

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // PROFILE
  // ==========================================

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  // ==========================================
  // PASSWORD
  // ==========================================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordSaving, setPasswordSaving] = useState(false);

  // ==========================================
  // ALERTS
  // ==========================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // GET CURRENT USER
  // ==========================================

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/me");

      if (response.data.success) {
        const currentUser = response.data.user;

        setUser(currentUser);
        setFullName(currentUser?.fullName || "");
        setEmail(currentUser?.email || "");
      }
    } catch (err) {
      console.error("Failed to fetch current user:", err);

      setError(
        err.response?.data?.message || "Unable to load account information.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Full name cannot be empty.");
      return;
    }

    if (!email.trim()) {
      setError("Email cannot be empty.");
      return;
    }

    try {
      setProfileSaving(true);

      const response = await api.patch("/auth/profile", {
        fullName: fullName.trim(),
        email: email.trim(),
      });

      if (response.data.success) {
        const updatedUser = response.data.user;

        setUser(updatedUser);
        setFullName(updatedUser?.fullName || "");
        setEmail(updatedUser?.email || "");

        setSuccess(response.data.message || "Profile updated successfully.");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);

      setError(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setPasswordSaving(true);

      const response = await api.patch("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setSuccess(response.data.message || "Password changed successfully.");
      }
    } catch (err) {
      console.error("Failed to change password:", err);

      setError(err.response?.data?.message || "Unable to change password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  // ==========================================
  // CLEAR ALERTS
  // ==========================================

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-slate-200" />

          <div className="h-64 rounded-2xl bg-white" />

          <div className="h-72 rounded-2xl bg-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* ======================================
            HEADER
        ======================================= */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
            ADMINISTRATION
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your administrator account and security settings.
          </p>
        </motion.div>

        {/* ======================================
            ALERTS
        ======================================= */}

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />

            <span className="flex-1">{error}</span>

            <button type="button" onClick={clearMessages}>
              <X size={15} />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />

            <span className="flex-1">{success}</span>

            <button type="button" onClick={clearMessages}>
              <X size={15} />
            </button>
          </div>
        )}

        {/* ======================================
            PROFILE
        ======================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Profile Information
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Update your administrator account information.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>
            </div>

            {/* Account Role */}

            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-emerald-500" />

                <div>
                  <p className="text-xs font-bold text-slate-700">
                    Administrator Account
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Role:{" "}
                    <span className="font-semibold text-slate-600">
                      {user?.role || "admin"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {profileSaving ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.section>

        {/* ======================================
            SECURITY
        ======================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <LockKeyhole size={20} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Account Security
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Change your password to keep your account secure.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <PasswordInput
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={showCurrentPassword}
                setVisible={setShowCurrentPassword}
              />

              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                visible={showNewPassword}
                setVisible={setShowNewPassword}
              />

              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirmPassword}
                setVisible={setShowConfirmPassword}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <KeyRound size={13} />
                Password must contain at least 6 characters.
              </div>

              <button
                type="submit"
                disabled={passwordSaving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {passwordSaving ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={15} />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.section>

        {/* ======================================
            ACCOUNT STATUS
        ======================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  Account Status
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  Your administrator account is currently active.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

// ==========================================
// PASSWORD INPUT
// ==========================================

const PasswordInput = ({ label, value, onChange, visible, setVisible }) => {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
