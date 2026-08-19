import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaSearch, FaTimes, FaFilter } from "react-icons/fa";

import Container from "../../components/ui/Container";
import ProjectCard from "../../components/ui/ProjectCard";
import api from "../../services/api";

const categories = [
  "Web Development",
  "Mobile App",
  "AI/ML",
  "Data Science",
  "Blockchain",
  "Cyber Security",
  "IoT",
  "Desktop Application",
  "Game Development",
  "Other",
];

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [techStack, setTechStack] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PROJECTS
  // ==========================================

  const fetchProjects = async ({
    searchValue = search,
    categoryValue = category,
    techStackValue = techStack,
    sortValue = sort,
    pageValue = page,
  } = {}) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/projects/search", {
        params: {
          search: searchValue,
          category: categoryValue,
          techStack: techStackValue,
          sort: sortValue,
          page: pageValue,
          limit: 12,
        },
      });

      setProjects(data.projects || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch projects:", error);

      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchProjects({
      pageValue: page,
    });
  }, [page]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(1);

    fetchProjects({
      searchValue: search,
      categoryValue: category,
      techStackValue: techStack,
      sortValue: sort,
      pageValue: 1,
    });
  };

  // ==========================================
  // CATEGORY
  // ==========================================

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);
    setPage(1);

    fetchProjects({
      searchValue: search,
      categoryValue: value,
      techStackValue: techStack,
      sortValue: sort,
      pageValue: 1,
    });
  };

  // ==========================================
  // TECH STACK
  // ==========================================

  const handleTechStackChange = (event) => {
    const value = event.target.value;

    setTechStack(value);
    setPage(1);

    fetchProjects({
      searchValue: search,
      categoryValue: category,
      techStackValue: value,
      sortValue: sort,
      pageValue: 1,
    });
  };

  // ==========================================
  // SORT
  // ==========================================

  const handleSortChange = (event) => {
    const value = event.target.value;

    setSort(value);
    setPage(1);

    fetchProjects({
      searchValue: search,
      categoryValue: category,
      techStackValue: techStack,
      sortValue: value,
      pageValue: 1,
    });
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setTechStack("");
    setSort("latest");
    setPage(1);

    fetchProjects({
      searchValue: "",
      categoryValue: "",
      techStackValue: "",
      sortValue: "latest",
      pageValue: 1,
    });
  };

  const hasFilters = search || category || techStack || sort !== "latest";

  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <Container>
        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={handleBack}
          className="group mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <FaArrowLeft className="text-xs transition group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <FaFilter className="text-xl" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            Explore Student Projects
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Discover innovative projects built by talented students across
            different technologies and domains.
          </p>
        </div>

        {/* ==========================================
            SEARCH
        ========================================== */}

        <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
            >
              <FaSearch className="text-xs" />
              Search
            </button>
          </div>
        </form>

        {/* ==========================================
            FILTERS
        ========================================== */}

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {/* Category */}

          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Tech Stack */}

          <input
            type="text"
            value={techStack}
            onChange={handleTechStackChange}
            placeholder="Filter by tech stack..."
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {/* Sort */}

          <select
            value={sort}
            onChange={handleSortChange}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="latest">Latest</option>

            <option value="oldest">Oldest</option>

            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>

        {/* ==========================================
            CLEAR FILTERS
        ========================================== */}

        {hasFilters && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
              <FaTimes className="text-xs" />
              Clear Filters
            </button>
          </div>
        )}

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="mt-4 text-sm text-slate-500">Loading projects...</p>
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div className="mt-12 rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
            <h2 className="font-semibold text-red-700">Something went wrong</h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => fetchProjects()}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==========================================
            EMPTY
        ========================================== */}

        {!loading && !error && projects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FaSearch />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-800">
              No projects found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or change your filters.
            </p>

            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ==========================================
            PROJECT GRID
        ========================================== */}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-12">
            {/* Result Info */}

            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {projects.length}
                </span>{" "}
                projects
              </p>

              <p className="text-sm text-slate-400">
                Page {page} of {totalPages}
              </p>
            </div>

            {/* Cards */}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} {...project} />
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            PAGINATION
        ========================================== */}

        {!loading && !error && totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              ← Previous
            </button>

            <div className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
              Page {page} of {totalPages}
            </div>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Next →
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Projects;
