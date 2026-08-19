import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  UserRound,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
  Mail,
  Globe,
  ExternalLink,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  UserCheck,
  Ban,
  IndianRupee,
  Link,
  Loader2,
} from "lucide-react";

const AdminApplicationDetailsModal = ({
  application,
  loading = false,
  onClose,
  onStatusUpdate,
  statusUpdating = false,
}) => {
  if (!application && !loading) {
    return null;
  }

  const student = application?.student || {};
  const recruiter = application?.recruiter || {};
  const internship = application?.internship || {};

  const studentUser = student?.user || {};
  const recruiterUser = recruiter?.user || {};

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Accepted":
        return {
          icon: CheckCircle2,
          label: "Accepted",
          className: "bg-emerald-50 text-emerald-700 border-emerald-100",
        };

      case "Shortlisted":
        return {
          icon: UserCheck,
          label: "Shortlisted",
          className: "bg-indigo-50 text-indigo-700 border-indigo-100",
        };

      case "Rejected":
        return {
          icon: XCircle,
          label: "Rejected",
          className: "bg-red-50 text-red-700 border-red-100",
        };

      case "Withdrawn":
        return {
          icon: Ban,
          label: "Withdrawn",
          className: "bg-slate-100 text-slate-600 border-slate-200",
        };

      default:
        return {
          icon: Clock3,
          label: "Pending",
          className: "bg-amber-50 text-amber-700 border-amber-100",
        };
    }
  };

  const statusConfig = getStatusConfig(application?.status);

  const StatusIcon = statusConfig.icon;

  return (
    <AnimatePresence>
      {(application || loading) && (
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
            z-[120]
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
              max-w-4xl
              overflow-hidden
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

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-4
                sm:px-6
              "
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                  APPLICATION DETAILS
                </p>

                <h2 className="mt-1 text-base font-bold text-slate-900">
                  Application Overview
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="
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
            </div>

            {/* ==========================================
                BODY
            =========================================== */}

            <div className="max-h-[calc(90vh-73px)] overflow-y-auto">
              {loading ? (
                <div className="space-y-5 p-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-2xl border border-slate-100 p-5"
                    >
                      <div className="h-4 w-40 rounded bg-slate-100" />

                      <div className="mt-4 h-3 w-full rounded bg-slate-100" />

                      <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 p-5 sm:p-6">
                  {/* ======================================
                      APPLICATION STATUS
                  ======================================= */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      rounded-2xl
                      border
                      border-slate-100
                      bg-slate-50/70
                      p-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Application Status
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {internship.title || "Internship Application"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Applied on {formatDate(application?.appliedAt)}
                      </p>
                    </div>

                    <span
                      className={`
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-xl
                        border
                        px-3
                        py-2
                        text-xs
                        font-bold
                        ${statusConfig.className}
                      `}
                    >
                      <StatusIcon size={14} />

                      {statusConfig.label}
                    </span>
                  </div>
                  {/* ======================================
    APPLICATION STATUS ACTIONS
======================================= */}

                  {application && !loading && (
                    <section>
                      <SectionTitle>Manage Application</SectionTitle>

                      <div
                        className="
      rounded-2xl
      border
      border-slate-100
      bg-white
      p-5
      shadow-sm
    "
                      >
                        <div
                          className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
                        >
                          <div>
                            <p
                              className="
            text-xs
            font-bold
            text-slate-800
          "
                            >
                              Update application status
                            </p>

                            <p
                              className="
            mt-1
            text-[11px]
            text-slate-400
          "
                            >
                              Choose the appropriate status for this
                              application.
                            </p>
                          </div>

                          <div
                            className="
          flex
          flex-wrap
          gap-2
        "
                          >
                            {/* Shortlist */}

                            <StatusActionButton
                              label="Shortlist"
                              icon={UserCheck}
                              disabled={
                                statusUpdating ||
                                application.status === "Shortlisted"
                              }
                              onClick={() => onStatusUpdate("Shortlisted")}
                              className="
              border-indigo-200
              bg-indigo-50
              text-indigo-600
              hover:bg-indigo-100
            "
                            />

                            {/* Accept */}

                            <StatusActionButton
                              label="Accept"
                              icon={CheckCircle2}
                              disabled={
                                statusUpdating ||
                                application.status === "Accepted"
                              }
                              onClick={() => onStatusUpdate("Accepted")}
                              className="
              border-emerald-200
              bg-emerald-50
              text-emerald-600
              hover:bg-emerald-100
            "
                            />

                            {/* Reject */}

                            <StatusActionButton
                              label="Reject"
                              icon={XCircle}
                              disabled={
                                statusUpdating ||
                                application.status === "Rejected"
                              }
                              onClick={() => onStatusUpdate("Rejected")}
                              className="
              border-red-200
              bg-red-50
              text-red-600
              hover:bg-red-100
            "
                            />
                          </div>
                        </div>

                        {statusUpdating && (
                          <div
                            className="
          mt-4
          flex
          items-center
          gap-2
          rounded-xl
          bg-slate-50
          px-3
          py-2.5
          text-xs
          font-medium
          text-slate-500
        "
                          >
                            <Loader2 size={14} className="animate-spin" />
                            Updating application status...
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* ======================================
                      STUDENT
                  ======================================= */}

                  <section>
                    <SectionTitle>Student Information</SectionTitle>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                      <div className="flex flex-col gap-5 sm:flex-row">
                        {/* Avatar */}

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
                            bg-indigo-50
                            text-indigo-500
                          "
                        >
                          {student.profileImage ? (
                            <img
                              src={student.profileImage}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <UserRound size={25} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-slate-900">
                            {studentUser.fullName ||
                              student.fullName ||
                              "Student"}
                          </h3>

                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Mail size={13} />

                            {studentUser.email ||
                              student.email ||
                              "Email not available"}
                          </p>

                          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <InfoItem
                              icon={GraduationCap}
                              label="Course"
                              value={student.course || "—"}
                            />

                            <InfoItem
                              icon={Building2}
                              label="College"
                              value={student.college || "—"}
                            />

                            <InfoItem
                              icon={CalendarDays}
                              label="Graduation"
                              value={student.graduationYear || "—"}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Skills */}

                      {Array.isArray(student.skills) &&
                        student.skills.length > 0 && (
                          <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Skills
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {student.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="
                                      rounded-lg
                                      bg-slate-100
                                      px-2.5
                                      py-1.5
                                      text-[10px]
                                      font-semibold
                                      text-slate-600
                                    "
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Links */}

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                        {student.github && (
                          <ExternalLinkButton
                            icon={Link}
                            label="GitHub"
                            href={student.github}
                          />
                        )}

                        {student.linkedin && (
                          <ExternalLinkButton
                            icon={Link}
                            label="LinkedIn"
                            href={student.linkedin}
                          />
                        )}

                        {student.portfolio && (
                          <ExternalLinkButton
                            icon={Globe}
                            label="Portfolio"
                            href={student.portfolio}
                          />
                        )}

                        {student.resume && (
                          <ExternalLinkButton
                            icon={FileText}
                            label="Resume"
                            href={student.resume}
                          />
                        )}
                      </div>
                    </div>
                  </section>

                  {/* ======================================
                      INTERNSHIP
                  ======================================= */}

                  <section>
                    <SectionTitle>Internship Information</SectionTitle>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-50
                            text-indigo-600
                          "
                        >
                          <BriefcaseBusiness size={19} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900">
                            {internship.title || "Internship"}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            {internship.category || "Category not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <InfoItem
                          icon={MapPin}
                          label="Location"
                          value={internship.location || "—"}
                        />

                        <InfoItem
                          icon={BriefcaseBusiness}
                          label="Work Mode"
                          value={internship.workMode || "—"}
                        />

                        <InfoItem
                          icon={IndianRupee}
                          label="Stipend"
                          value={internship.stipend || "—"}
                        />

                        <InfoItem
                          icon={CalendarDays}
                          label="Deadline"
                          value={formatDate(internship.applicationDeadline)}
                        />
                      </div>

                      {internship.description && (
                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Description
                          </p>

                          <p className="mt-2 whitespace-pre-line text-xs leading-6 text-slate-500">
                            {internship.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* ======================================
                      RECRUITER
                  ======================================= */}

                  <section>
                    <SectionTitle>Recruiter Information</SectionTitle>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-xl
                            bg-slate-100
                            text-slate-500
                          "
                        >
                          {recruiter.companyLogo ? (
                            <img
                              src={recruiter.companyLogo}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Building2 size={20} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">
                              {recruiter.companyName || "Company"}
                            </h3>

                            {recruiter.isVerifiedCompany && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
                                <CheckCircle2 size={10} />
                                Verified
                              </span>
                            )}
                          </div>

                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                            <Mail size={12} />

                            {recruiterUser.email || "Email not available"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <InfoItem
                          icon={Building2}
                          label="Industry"
                          value={recruiter.industry || "—"}
                        />

                        <InfoItem
                          icon={UserRound}
                          label="Company Size"
                          value={recruiter.companySize || "—"}
                        />

                        <InfoItem
                          icon={MapPin}
                          label="Location"
                          value={recruiter.location || "—"}
                        />
                      </div>

                      {recruiter.website && (
                        <div className="mt-4">
                          <ExternalLinkButton
                            icon={Globe}
                            label="Company Website"
                            href={recruiter.website}
                          />
                        </div>
                      )}
                    </div>
                  </section>

                  {/* ======================================
                      APPLICATION ID
                  ======================================= */}

                  <section>
                    <SectionTitle>Application ID</SectionTitle>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <p className="break-all font-mono text-[10px] text-slate-400">
                        {application?._id || "Not available"}
                      </p>
                    </div>
                  </section>
                </div>
              )}
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
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
      {children}
    </p>
  );
};

// ==========================================
// INFO ITEM
// ==========================================

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-slate-400" />

        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
};

// ==========================================
// EXTERNAL LINK BUTTON
// ==========================================

const ExternalLinkButton = ({ icon: Icon, label, href }) => {
  const normalizedHref = href?.startsWith("http") ? href : `https://${href}`;

  return (
    <a
      href={normalizedHref}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-[10px]
        font-semibold
        text-slate-600
        transition
        hover:border-indigo-200
        hover:bg-indigo-50
        hover:text-indigo-600
      "
    >
      <Icon size={13} />

      {label}

      <ExternalLink size={11} />
    </a>
  );
};

// ==========================================
// STATUS ACTION BUTTON
// ==========================================

const StatusActionButton = ({
  label,
  icon: Icon,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-lg
        border
        px-3
        py-2
        text-[10px]
        font-bold
        transition
        disabled:cursor-not-allowed
        disabled:opacity-40
        ${className}
      `}
    >
      <Icon size={13} />

      {label}
    </button>
  );
};

export default AdminApplicationDetailsModal;
