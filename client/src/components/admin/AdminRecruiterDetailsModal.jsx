import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  Building2,
  Mail,
  MapPin,
  Globe,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Clock3,
  ShieldCheck,
  ShieldAlert,
  UserRound,
  ExternalLink,
} from "lucide-react";

const AdminRecruiterDetailsModal = ({ recruiter, onClose }) => {
  if (!recruiter) return null;

  const user = recruiter.user || {};

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // FORMAT DATE + TIME
  // ==========================================

  const formatDateTime = (date) => {
    if (!date) {
      return "Never";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {recruiter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-sm
          "
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
            className="
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-2xl
              border
              border-white/60
              bg-white
              shadow-2xl
            "
          >
            {/* ==========================================
                HEADER
            =========================================== */}

            <div className="relative overflow-hidden border-b border-slate-100 px-6 pb-6 pt-6">
              {/* Decorative background */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100/70 blur-3xl" />

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="
                  absolute
                  right-4
                  top-4
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >
                <X size={18} />
              </button>

              <div className="relative flex items-start gap-4">
                {/* Company Logo */}

                <div
                  className="
                    flex
                    h-16
                    w-16
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-blue-600
                    text-xl
                    font-bold
                    text-white
                    shadow-lg
                    shadow-indigo-500/20
                  "
                >
                  {recruiter.companyLogo ? (
                    <img
                      src={recruiter.companyLogo}
                      alt={recruiter.companyName || "Company"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    recruiter.companyName?.charAt(0)?.toUpperCase() || "C"
                  )}
                </div>

                {/* Company Header Info */}

                <div className="min-w-0 pr-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {recruiter.companyName || "Unnamed Company"}
                    </h2>

                    {/* Verification Badge */}

                    {recruiter.isVerifiedCompany ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-emerald-50
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                          text-emerald-700
                        "
                      >
                        <ShieldCheck size={12} />
                        Verified
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-amber-50
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                          text-amber-700
                        "
                      >
                        <ShieldAlert size={12} />
                        Unverified
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {recruiter.industry || "Industry not specified"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />

                      {recruiter.location || "Location not specified"}
                    </span>

                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      Joined {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                CONTENT
            =========================================== */}

            <div className="space-y-6 p-6">
              {/* ==========================================
                  COMPANY OVERVIEW
              =========================================== */}

              <section>
                <SectionTitle>Company Overview</SectionTitle>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoCard
                    icon={BriefcaseBusiness}
                    label="Industry"
                    value={recruiter.industry || "Not specified"}
                  />

                  <InfoCard
                    icon={Users}
                    label="Company Size"
                    value={recruiter.companySize || "Not specified"}
                  />

                  <InfoCard
                    icon={MapPin}
                    label="Location"
                    value={recruiter.location || "Not specified"}
                  />

                  <InfoCard
                    icon={Globe}
                    label="Website"
                    value={recruiter.website || "Not provided"}
                    isLink={Boolean(recruiter.website)}
                  />
                </div>
              </section>

              {/* ==========================================
                  COMPANY DESCRIPTION
              =========================================== */}

              <section>
                <SectionTitle>Company Description</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="text-sm leading-6 text-slate-600">
                    {recruiter.description ||
                      "No company description has been provided."}
                  </p>
                </div>
              </section>

              {/* ==========================================
                  RECRUITER ACCOUNT
              =========================================== */}

              <section>
                <SectionTitle>Recruiter Account</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-slate-500
                        shadow-sm
                      "
                    >
                      <UserRound size={18} />
                    </div>

                    {/* User */}

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800">
                        {user.fullName || "Unknown Recruiter"}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400" />

                        <p className="truncate text-xs text-slate-400">
                          {user.email || "No email available"}
                        </p>
                      </div>
                    </div>

                    {/* Account Status */}

                    <span
                      className={`
                        ml-auto
                        shrink-0
                        rounded-lg
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-bold
                        ${
                          user.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </section>

              {/* ==========================================
                  ACCOUNT ACTIVITY
              =========================================== */}

              <section>
                <SectionTitle>Account Activity</SectionTitle>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoCard
                    icon={CalendarDays}
                    label="Account Created"
                    value={formatDate(user.createdAt)}
                  />

                  <InfoCard
                    icon={Clock3}
                    label="Last Login"
                    value={formatDateTime(user.lastLoginAt)}
                  />

                  <InfoCard
                    icon={ShieldCheck}
                    label="User Verification"
                    value={user.isVerified ? "Verified" : "Not Verified"}
                    valueClassName={
                      user.isVerified ? "text-emerald-600" : "text-slate-500"
                    }
                  />

                  <InfoCard
                    icon={Building2}
                    label="Company Verification"
                    value={recruiter.isVerifiedCompany ? "Verified" : "Pending"}
                    valueClassName={
                      recruiter.isVerifiedCompany
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }
                  />
                </div>
              </section>

              {/* ==========================================
                  RECRUITER PROFILE ID
              =========================================== */}

              <section>
                <SectionTitle>Recruiter Profile ID</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="break-all font-mono text-[11px] text-slate-500">
                    {recruiter._id || "Not available"}
                  </p>
                </div>
              </section>
            </div>

            {/* ==========================================
                FOOTER
            =========================================== */}

            <div
              className="
                flex
                justify-end
                border-t
                border-slate-100
                bg-slate-50/50
                px-6
                py-4
              "
            >
              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-xl
                  bg-slate-900
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                "
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

// ==========================================
// SECTION TITLE
// ==========================================

const SectionTitle = ({ children }) => {
  return (
    <p
      className="
        mb-3
        text-[10px]
        font-bold
        uppercase
        tracking-[0.16em]
        text-slate-400
      "
    >
      {children}
    </p>
  );
};

// ==========================================
// INFO CARD
// ==========================================

const InfoCard = ({
  icon: Icon,
  label,
  value,
  valueClassName = "text-slate-700",
  isLink = false,
}) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-100
        bg-slate-50/60
        p-3.5
      "
    >
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-slate-400" />

        <span className="text-[10px] font-medium text-slate-400">{label}</span>
      </div>

      {isLink && value !== "Not provided" ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noreferrer"
          className="
            mt-2
            inline-flex
            max-w-full
            items-center
            gap-1
            truncate
            text-xs
            font-bold
            text-indigo-600
            hover:text-indigo-700
          "
        >
          <span className="truncate">{value}</span>

          <ExternalLink size={11} className="shrink-0" />
        </a>
      ) : (
        <p className={`mt-2 truncate text-xs font-bold ${valueClassName}`}>
          {value}
        </p>
      )}
    </div>
  );
};

// ==========================================
// DEFAULT EXPORT
// ==========================================

export default AdminRecruiterDetailsModal;
