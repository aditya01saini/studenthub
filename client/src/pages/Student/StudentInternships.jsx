import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaSearch,
  FaUsers,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

import { getStudentInternships } from "../../services/student.service";

const categories = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile App Development",
  "Software Development",
  "AI/ML",
  "Data Science",
  "Cyber Security",
  "UI/UX Design",
  "DevOps",
  "Cloud Computing",
  "Blockchain",
  "Digital Marketing",
  "Content Writing",
  "Graphic Design",
  "Human Resources",
  "Finance",
  "Business Development",
  "Sales",
  "Other",
];

const workModes = ["Remote", "Hybrid", "Onsite"];

const experiences = [
  "Fresher",
  "0-1 Years",
  "1-2 Years",
  "2-3 Years",
];

const StudentInternships = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [experience, setExperience] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const LIMIT = 9;

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit: LIMIT,
          sort,
        };

        if (search) params.search = search;
        if (category) params.category = category;
        if (workMode) params.workMode = workMode;
        if (experience) params.experience = experience;

        const data = await getStudentInternships(params);

        if (data.success) {
          setInternships(data.internships || []);
          setTotalPages(data.totalPages || 1);
          setTotalResults(data.totalResults || 0);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load internships. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [page, search, category, workMode, experience, sort]);

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setWorkMode("");
    setExperience("");
    setSort("latest");
    setPage(1);
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const hasFilters =
    search ||
    category ||
    workMode ||
    experience ||
    sort !== "latest";

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatStipend = (stipend) => {
    if (stipend === 0) {
      return "Unpaid";
    }

    return `₹${Number(stipend || 0).toLocaleString("en-IN")}/month`;
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <section className="mb-7 sm:mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
          Career Opportunities
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Find Your Next Internship
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Discover opportunities, build industry experience and take the next
          step in your career.
        </p>
      </section>

      {/* Search + Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by role, skill or keyword..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <select
            value={category}
            onChange={(e) =>
              handleFilterChange(setCategory, e.target.value)
            }
            className="min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={workMode}
            onChange={(e) =>
              handleFilterChange(setWorkMode, e.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Work Modes</option>

            {workModes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={experience}
            onChange={(e) =>
              handleFilterChange(setExperience, e.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Experience</option>

            {experiences.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              handleFilterChange(setSort, e.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="latest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="stipend">Highest Stipend</option>
          </select>
        </div>

        {hasFilters && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-500"
            >
              <FaTimes />
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Result Count */}
      {!loading && !error && (
        <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Available Internships
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {totalResults}{" "}
              {totalResults === 1 ? "opportunity" : "opportunities"} found
            </p>
          </div>

          {totalPages > 1 && (
            <p className="text-sm text-slate-400">
              Page {page} of {totalPages}
            </p>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[390px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="h-12 w-12 rounded-xl bg-slate-200" />
              <div className="mt-5 h-4 w-32 rounded bg-slate-200" />
              <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />
              <div className="mt-6 h-20 rounded-xl bg-slate-100" />
              <div className="mt-6 h-10 rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && internships.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-xl text-indigo-600">
            <FaBriefcase />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            No internships found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Try changing your search or filters to discover more internship
            opportunities.
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Internship Cards */}
      {!loading && !error && internships.length > 0 && (
        <section className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {internships.map((internship) => (
            <article
              key={internship._id}
              className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md sm:p-6"
            >
              {/* Company */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {internship.recruiter?.companyLogo ? (
                    <img
                      src={internship.recruiter.companyLogo}
                      alt={
                        internship.recruiter?.companyName || "Company"
                      }
                      className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-600">
                      <FaBuilding />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {internship.recruiter?.companyName ||
                        "Company"}
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-400">
                      <FaMapMarkerAlt className="shrink-0" />
                      {internship.location}
                    </p>
                  </div>
                </div>

                {internship.isFeatured && (
                  <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {internship.category}
                </p>

                <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-6 text-slate-900 sm:text-xl">
                  {internship.title}
                </h2>
              </div>

              {/* Basic Details */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Stipend
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {formatStipend(internship.stipend)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Work Mode
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {internship.workMode}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FaClock />
                  {internship.duration}
                </span>

                <span className="flex items-center gap-1.5">
                  <FaUsers />
                  {internship.openings}{" "}
                  {internship.openings === 1
                    ? "opening"
                    : "openings"}
                </span>
              </div>

              {/* Skills */}
              {internship.skillsRequired?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {internship.skillsRequired
                    .slice(0, 3)
                    .map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="max-w-full truncate rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600"
                      >
                        {skill}
                      </span>
                    ))}

                  {internship.skillsRequired.length > 3 && (
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                      +{internship.skillsRequired.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Bottom */}
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      Apply Before
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <FaCalendarAlt className="text-slate-400" />
                      {formatDate(internship.applicationDeadline)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/student/internships/${internship._id}`,
                      )
                    }
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Pagination */}
      {!loading &&
        !error &&
        internships.length > 0 &&
        totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-slate-700">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {totalPages}
              </span>
            </p>

            <div className="flex w-full items-center gap-2 sm:w-auto">
              <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => Math.max(prev - 1, 1))
                }
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, totalPages),
                  )
                }
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Next
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default StudentInternships;