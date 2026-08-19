const FilterBar = ({
  status,
  sort,
  onStatusChange,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Status Filter */}
      <select
        value={status}
        onChange={onStatusChange}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={onSortChange}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="stipend">Highest Stipend</option>
      </select>
    </div>
  );
};

export default FilterBar;