import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      {/* Page Info */}
      <p className="text-sm font-medium text-slate-600">
        Page{" "}
        <span className="font-bold text-slate-900">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-900">
          {totalPages}
        </span>
      </p>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;