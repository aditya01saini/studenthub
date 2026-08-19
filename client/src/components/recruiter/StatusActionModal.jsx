import { useEffect, useState } from "react";
import { X } from "lucide-react";

const StatusActionModal = ({ open, status, loading, onClose, onConfirm }) => {
  const [remark, setRemark] = useState("");

  useEffect(() => {
    if (open) {
      setRemark("");
    }
  }, [open]);

  if (!open) return null;

  const getButtonColor = () => {
    switch (status) {
      case "Accepted":
        return "bg-green-600 hover:bg-green-700";
      case "Rejected":
        return "bg-red-600 hover:bg-red-700";
      case "Shortlisted":
        return "bg-blue-600 hover:bg-blue-700";
      default:
        return "bg-indigo-600 hover:bg-indigo-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900">
            {status} Application
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <p className="text-slate-600">
            Are you sure you want to{" "}
            <span className="font-semibold">{status.toLowerCase()}</span> this
            application?
          </p>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Recruiter Remark (Optional)
            </label>

            <textarea
              rows={5}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-5 py-2 font-medium transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onConfirm(remark)}
            className={`rounded-xl px-5 py-2 font-semibold text-white transition ${getButtonColor()} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusActionModal;
