const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-slate-100 text-slate-700",
};

const ApplicationStatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default ApplicationStatusBadge;
