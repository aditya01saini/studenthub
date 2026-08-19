import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  ShieldCheck,
  ShieldAlert,
  Building2,
  AlertTriangle,
} from "lucide-react";

const RecruiterVerificationModal = ({
  recruiter,
  action,
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!recruiter) return null;

  const isVerify = action === "verify";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
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
          className="w-full max-w-md overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl"
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isVerify
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {isVerify ? (
                  <ShieldCheck size={19} />
                ) : (
                  <ShieldAlert size={19} />
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isVerify ? "Verify Company" : "Remove Verification"}
                </h3>

                <p className="text-[11px] text-slate-400">
                  Company verification
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={17} />
            </button>
          </div>

          {/* Content */}

          <div className="p-5">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white">
                {recruiter.companyLogo ? (
                  <img
                    src={recruiter.companyLogo}
                    alt={recruiter.companyName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  recruiter.companyName?.charAt(0)?.toUpperCase() || "C"
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800">
                  {recruiter.companyName || "Unnamed Company"}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {recruiter.industry || "Industry not specified"}
                </p>
              </div>
            </div>

            <div
              className={`mt-4 rounded-xl border p-4 ${
                isVerify
                  ? "border-emerald-100 bg-emerald-50/60"
                  : "border-amber-100 bg-amber-50/60"
              }`}
            >
              <div className="flex gap-3">
                {isVerify ? (
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                ) : (
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />
                )}

                <p className="text-xs leading-5 text-slate-600">
                  {isVerify
                    ? "This will mark the company as verified on StudentHub."
                    : "This will remove the company's verified status on StudentHub."}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Please make sure the company information has been reviewed before
              continuing.
            </p>
          </div>

          {/* Footer */}

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isVerify
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {loading && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loading
                ? "Updating..."
                : isVerify
                  ? "Verify Company"
                  : "Remove Verification"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecruiterVerificationModal;
