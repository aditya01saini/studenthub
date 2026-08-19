import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  ShieldCheck,
  CalendarDays,
  Clock3,
  UserRound,
  Building2,
  CircleCheck,
  CircleX,
} from "lucide-react";

const AdminUserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "Never";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleIcon = () => {
    if (user.role === "admin") return ShieldCheck;

    if (user.role === "recruiter") return Building2;

    return UserRound;
  };

  const RoleIcon = getRoleIcon();

  return (
    <AnimatePresence>
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/60 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative overflow-hidden border-b border-slate-100 px-6 pb-6 pt-6">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-100/60 blur-2xl" />

              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
                  {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate pr-10 text-lg font-bold text-slate-900">
                    {user.fullName || "Unknown User"}
                  </h2>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <RoleIcon size={13} />

                      <span className="capitalize">{user.role}</span>
                    </span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span
                      className={`text-xs font-semibold ${
                        user.isActive ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 p-6">
              {/* Contact */}
              <section>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Contact
                </p>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                      <Mail size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-slate-400">
                        Email
                      </p>

                      <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                        {user.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account */}
              <section>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Account Information
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoCard
                    icon={CalendarDays}
                    label="Joined"
                    value={formatDate(user.createdAt)}
                  />

                  <InfoCard
                    icon={Clock3}
                    label="Last Login"
                    value={formatDateTime(user.lastLoginAt)}
                  />

                  <InfoCard
                    icon={user.isActive ? CircleCheck : CircleX}
                    label="Account Status"
                    value={user.isActive ? "Active" : "Inactive"}
                    valueClassName={
                      user.isActive ? "text-emerald-600" : "text-slate-500"
                    }
                  />

                  <InfoCard
                    icon={ShieldCheck}
                    label="Verification"
                    value={user.isVerified ? "Verified" : "Not Verified"}
                    valueClassName={
                      user.isVerified ? "text-indigo-600" : "text-slate-500"
                    }
                  />
                </div>
              </section>

              {/* User ID */}
              <section>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  User ID
                </p>

                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="break-all font-mono text-[11px] text-slate-500">
                    {user._id}
                  </p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-slate-100 bg-slate-50/50 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
  valueClassName = "text-slate-700",
}) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-slate-400" />

        <span className="text-[10px] font-medium text-slate-400">{label}</span>
      </div>

      <p className={`mt-2 text-xs font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
};

export default AdminUserDetailsModal;
