import { AnimatePresence, motion } from "framer-motion";

import { X, Power, Star, AlertTriangle, CheckCircle2 } from "lucide-react";

const InternshipActionModal = ({
  internship,
  action,
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!internship) {
    return null;
  }

  const isActivate = action === "activate";
  const isDeactivate = action === "deactivate";
  const isFeature = action === "feature";
  const isUnfeature = action === "unfeature";

  const isPositiveAction = isActivate || isFeature;

  let title = "Confirm Action";
  let description = "Are you sure you want to continue?";
  let buttonText = "Confirm";

  if (isActivate) {
    title = "Activate Internship";
    description =
      "This internship will become active and available on StudentHub.";
    buttonText = "Activate Internship";
  }

  if (isDeactivate) {
    title = "Deactivate Internship";
    description =
      "This internship will be deactivated and will no longer be available as an active opportunity.";
    buttonText = "Deactivate Internship";
  }

  if (isFeature) {
    title = "Feature Internship";
    description =
      "This internship will be highlighted as a featured opportunity on StudentHub.";
    buttonText = "Feature Internship";
  }

  if (isUnfeature) {
    title = "Remove Featured Status";
    description =
      "This internship will no longer appear as a featured opportunity.";
    buttonText = "Remove Feature";
  }

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
            z-[110]
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
              w-full
              max-w-md
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

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    ${
                      isPositiveAction
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }
                  `}
                >
                  {isFeature || isUnfeature ? (
                    <Star size={19} />
                  ) : (
                    <Power size={19} />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{title}</h3>

                  <p className="text-[11px] text-slate-400">
                    Internship management
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                  disabled:opacity-50
                "
              >
                <X size={17} />
              </button>
            </div>

            {/* ==========================================
                CONTENT
            =========================================== */}

            <div className="p-5">
              {/* Internship */}

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center gap-3">
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
                    <Power size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {internship.title || "Untitled Internship"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {internship.recruiter?.companyName ||
                        "Company not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Information */}

              <div
                className={`
                  mt-4
                  rounded-xl
                  border
                  p-4
                  ${
                    isPositiveAction
                      ? "border-emerald-100 bg-emerald-50/60"
                      : "border-amber-100 bg-amber-50/60"
                  }
                `}
              >
                <div className="flex gap-3">
                  {isPositiveAction ? (
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                  ) : (
                    <AlertTriangle
                      size={18}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                  )}

                  <div>
                    <p className="text-xs font-bold text-slate-700">{title}</p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                This action will update the internship status on the StudentHub
                platform.
              </p>
            </div>

            {/* ==========================================
                FOOTER
            =========================================== */}

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    isPositiveAction
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }
                `}
              >
                {loading && (
                  <span
                    className="
                      h-3.5
                      w-3.5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />
                )}

                {loading ? "Updating..." : buttonText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InternshipActionModal;
