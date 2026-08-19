import { FileText } from "lucide-react";

const ResumeButton = ({ url }) => {
  if (!url) {
    return <span className="text-sm text-slate-400">No Resume</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
    >
      <FileText size={16} />
      View Resume
    </a>
  );
};

export default ResumeButton;
