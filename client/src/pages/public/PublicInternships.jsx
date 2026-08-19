import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Users,
  ArrowRight,
  Building2,
  Search,
  RotateCcw,
} from "lucide-react";

import api from "../../services/api";

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

const experiences = ["Fresher", "0-1 Years", "1-2 Years", "2-3 Years"];

const PublicInternships = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalResults, setTotalResults] = useState(0);

  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [workMode, setWorkMode] = useState("");

  const [experience, setExperience] = useState("");

  const [sort, setSort] = useState("latest");

  const LIMIT = 9;

  // ==========================================
  // FETCH INTERNSHIPS
  // ==========================================

  const fetchInternships = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: LIMIT,
        sort,
      };

      if (search) {
        params.search = search;
      }

      if (category) {
        params.category = category;
      }

      if (workMode) {
        params.workMode = workMode;
      }

      if (experience) {
        params.experience = experience;
      }

      const { data } = await api.get("/internships", {
        params,
      });

      setInternships(data.internships || []);
      setTotalPages(data.totalPages || 1);
      setTotalResults(data.totalResults || 0);
    } catch (err) {
      console.error("Failed to fetch internships:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load internships. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page, search, category, workMode, experience, sort]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  // ==========================================
  // FILTER CHANGE
  // ==========================================

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setWorkMode("");
    setExperience("");
    setSort("latest");
    setPage(1);
  };

  // ==========================================
  // VIEW INTERNSHIP
  // ==========================================

  const handleViewInternship = (id) => {
    navigate(`/internships/${id}`);
  };

  const hasFilters =
    search || category || workMode || experience || sort !== "latest";

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* ======================================
          PAGE HEADER
      ======================================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 sm:text-sm">
            Career Opportunities
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find Your Next Internship
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Discover internship opportunities from companies, build industry
            experience and take the next step in your career.
          </p>
        </div>
      </section>

      {/* ======================================
          MAIN
      ======================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ====================================
            SEARCH + FILTERS
        ===================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Search size={16} />
              Search
            </button>
          </form>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category */}

            <select
              value={category}
              onChange={(e) => handleFilterChange(setCategory, e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Work Mode */}

            <select
              value={workMode}
              onChange={(e) => handleFilterChange(setWorkMode, e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Work Modes</option>

              {workModes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Experience */}

            <select
              value={experience}
              onChange={(e) =>
                handleFilterChange(setExperience, e.target.value)
              }
              className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Experience</option>

              {experiences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Sort */}

            <select
              value={sort}
              onChange={(e) => handleFilterChange(setSort, e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                <RotateCcw size={15} />
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* ====================================
            RESULT COUNT
        ===================================== */}

        {!loading && !error && (
          <div className="mt-7 flex items-center justify-between">
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

        {/* ====================================
            LOADING
        ===================================== */}

        {loading && (
          <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="h-14 w-14 rounded-2xl bg-slate-200" />

                <div className="mt-5 h-4 w-32 rounded bg-slate-200" />

                <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />

                <div className="mt-6 h-20 rounded-xl bg-slate-100" />

                <div className="mt-6 h-10 rounded-xl bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* ====================================
            ERROR
        ===================================== */}

        {!loading && error && (
          <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchInternships}
              className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ====================================
            EMPTY
        ===================================== */}

        {!loading && !error && internships.length === 0 && (
          <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <BriefcaseBusiness size={25} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No internships found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* ====================================
            INTERNSHIP CARDS
        ===================================== */}

        {!loading && !error && internships.length > 0 && (
          <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship) => (
              <article
                key={internship._id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                {/* ======================
                        CARD HEADER
                    ======================= */}

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Company Logo */}

                      {internship.recruiter?.companyLogo ? (
                        <img
                          src={internship.recruiter.companyLogo}
                          alt={internship.recruiter?.companyName || "Company"}
                          className="h-14 w-14 shrink-0 rounded-2xl border border-slate-100 bg-white object-contain p-1.5 shadow-sm"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                          <Building2 size={24} />
                        </div>
                      )}

                      {/* Company */}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {internship.recruiter?.companyName || "Company"}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-400">
                          <MapPin size={13} className="shrink-0" />

                          {internship.location || "Location not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Featured */}

                    {internship.isFeatured && (
                      <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-600">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* ======================
                          TITLE
                      ======================= */}

                  <div className="mt-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                      {internship.category || "Internship"}
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-xl font-bold leading-7 text-slate-900">
                      {internship.title}
                    </h2>
                  </div>

                  {/* ======================
                          DETAILS
                      ======================= */}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <IndianRupee size={14} />

                        <span className="text-xs">Stipend</span>
                      </div>

                      <p className="mt-1 truncate text-sm font-bold text-slate-800">
                        {internship.stipend
                          ? `₹${Number(internship.stipend).toLocaleString(
                              "en-IN",
                            )}/month`
                          : "Unpaid"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <BriefcaseBusiness size={14} />

                        <span className="text-xs">Work Mode</span>
                      </div>

                      <p className="mt-1 truncate text-sm font-bold text-slate-800">
                        {internship.workMode || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* ======================
                          META
                      ======================= */}

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} />

                      {internship.duration || "Not specified"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Users size={14} />
                      {internship.openings || 0}{" "}
                      {internship.openings === 1 ? "opening" : "openings"}
                    </span>
                  </div>

                  {/* ======================
                          SKILLS
                      ======================= */}

                  {internship.skillsRequired?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {internship.skillsRequired
                        .slice(0, 3)
                        .map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-600"
                          >
                            {skill}
                          </span>
                        ))}

                      {internship.skillsRequired.length > 3 && (
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                          +{internship.skillsRequired.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* ======================
                        CARD FOOTER
                    ======================= */}

                <div className="mt-auto border-t border-slate-100 bg-slate-50/50 p-5 sm:p-6">
                  <button
                    type="button"
                    onClick={() => handleViewInternship(internship._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md"
                  >
                    View Internship
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ====================================
            PAGINATION
        ===================================== */}

        {!loading && !error && internships.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
            <p className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-700">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">{totalPages}</span>
            </p>

            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="flex-1 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicInternships;
