import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  BriefcaseBusiness,
  Building2,
  MapPin,
  CalendarDays,
  Clock3,
  Users,
  IndianRupee,
  ExternalLink,
  Star,
  CheckCircle2,
  XCircle,
  UserRound,
} from "lucide-react";

const AdminInternshipDetailsModal = ({ internship, onClose }) => {
  if (!internship) {
    return null;
  }

  const recruiter = internship.recruiter || {};

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

  const formatDateTime = (date) => {
    if (!date) {
      return "Not available";
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
      {internship && (
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
              max-w-3xl
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
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-100/70 blur-3xl" />

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
                {/* Internship Icon */}

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
                    <BriefcaseBusiness size={27} />
                  )}
                </div>

                {/* Header Information */}

                <div className="min-w-0 pr-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {internship.title || "Untitled Internship"}
                    </h2>

                    {/* Status */}

                    {internship.status === "Open" ? (
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
                        <CheckCircle2 size={12} />
                        Open
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-red-50
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                          text-red-700
                        "
                      >
                        <XCircle size={12} />
                        Closed
                      </span>
                    )}

                    {/* Featured */}

                    {internship.isFeatured && (
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
                        <Star size={12} />
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-500">
                    <Building2 size={14} />

                    {recruiter.companyName || "Company not specified"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />

                      {recruiter.location || "Location not specified"}
                    </span>

                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                    <span>
                      {internship.workMode || "Work mode not specified"}
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
                  QUICK INFORMATION
              =========================================== */}

              <section>
                <SectionTitle>Internship Overview</SectionTitle>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoCard
                    icon={BriefcaseBusiness}
                    label="Category"
                    value={internship.category || "Not specified"}
                  />

                  <InfoCard
                    icon={MapPin}
                    label="Work Mode"
                    value={internship.workMode || "Not specified"}
                  />

                  <InfoCard
                    icon={Users}
                    label="Openings"
                    value={internship.openings ?? "Not specified"}
                  />

                  <InfoCard
                    icon={IndianRupee}
                    label="Stipend"
                    value={internship.stipend || "Not specified"}
                  />

                  <InfoCard
                    icon={Clock3}
                    label="Duration"
                    value={internship.duration || "Not specified"}
                  />

                  <InfoCard
                    icon={CalendarDays}
                    label="Application Deadline"
                    value={formatDate(internship.deadline)}
                  />
                </div>
              </section>

              {/* ==========================================
                  DESCRIPTION
              =========================================== */}

              <section>
                <SectionTitle>Description</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                    {internship.description ||
                      "No description has been provided."}
                  </p>
                </div>
              </section>

              {/* ==========================================
                  REQUIREMENTS
              =========================================== */}

              <section>
                <SectionTitle>Requirements</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  {Array.isArray(internship.requirements) &&
                  internship.requirements.length > 0 ? (
                    <ul className="space-y-2">
                      {internship.requirements.map((requirement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />

                          {requirement}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">
                      No specific requirements provided.
                    </p>
                  )}
                </div>
              </section>

              {/* ==========================================
                  RECRUITER
              =========================================== */}

              <section>
                <SectionTitle>Recruiter Information</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-white
                        text-slate-500
                        shadow-sm
                      "
                    >
                      {recruiter.companyLogo ? (
                        <img
                          src={recruiter.companyLogo}
                          alt={recruiter.companyName || "Company"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound size={19} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800">
                        {recruiter.companyName || "Company not specified"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {recruiter.email ||
                          recruiter.user?.email ||
                          "Email not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ==========================================
                  WEBSITE
              =========================================== */}

              {recruiter.website && (
                <section>
                  <SectionTitle>Company Website</SectionTitle>

                  <a
                    href={
                      recruiter.website.startsWith("http")
                        ? recruiter.website
                        : `https://${recruiter.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-indigo-600
                      transition
                      hover:border-indigo-200
                      hover:bg-indigo-50
                    "
                  >
                    <GlobeIcon />

                    <span className="truncate">{recruiter.website}</span>

                    <ExternalLink size={13} className="shrink-0" />
                  </a>
                </section>
              )}

              {/* ==========================================
                  TIMESTAMPS
              =========================================== */}

              <section>
                <SectionTitle>Internship Activity</SectionTitle>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoCard
                    icon={CalendarDays}
                    label="Created"
                    value={formatDateTime(internship.createdAt)}
                  />

                  <InfoCard
                    icon={Clock3}
                    label="Last Updated"
                    value={formatDateTime(internship.updatedAt)}
                  />
                </div>
              </section>

              {/* ==========================================
                  INTERNSHIP ID
              =========================================== */}

              <section>
                <SectionTitle>Internship ID</SectionTitle>

                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="break-all font-mono text-[11px] text-slate-500">
                    {internship._id || "Not available"}
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

const InfoCard = ({ icon: Icon, label, value }) => {
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

      <p className="mt-2 truncate text-xs font-bold text-slate-700">{value}</p>
    </div>
  );
};

// ==========================================
// WEBSITE ICON
// ==========================================

const GlobeIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};

export default AdminInternshipDetailsModal;
