import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";

import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import StudentCard from "../../components/ui/StudentCard";

import api from "../../services/api";

const Students = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents = async (searchValue = search, pageValue = page) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/student/search", {
        params: {
          search: searchValue,
          page: pageValue,
          limit: 12,
        },
      });

      setStudents(data.students || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch students:", error);

      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchStudents(search, page);
  }, [page]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(1);

    fetchStudents(search, 1);
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const handleClearSearch = () => {
    setSearch("");
    setPage(1);

    fetchStudents("", 1);
  };

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

        <div className="mb-7">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back
          </button>
        </div>

        {/* ==========================================
            HEADER
        ========================================== */}

        <SectionTitle
          title="Explore Students"
          subtitle="Discover talented students, their skills, projects and achievements."
        />

        {/* ==========================================
            SEARCH
        ========================================== */}

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by college, course or skill..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md"
          >
            <FaSearch className="text-xs" />
            Search
          </button>
        </form>

        {/* ==========================================
            CLEAR SEARCH
        ========================================== */}

        {search && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
              <FaTimes className="text-xs" />
              Clear Search
            </button>
          </div>
        )}

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="mt-4 text-sm text-slate-500">Loading students...</p>
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div className="mt-12 rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
            <h2 className="text-lg font-semibold text-red-700">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => fetchStudents(search, page)}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==========================================
            EMPTY
        ========================================== */}

        {!loading && !error && students.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FaSearch />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-800">
              No students found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with another college, course or skill.
            </p>

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* ==========================================
            STUDENTS
        ========================================== */}

        {!loading && !error && students.length > 0 && (
          <div className="mt-12">
            {/* Result Count */}

            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {students.length}
                </span>{" "}
                students
                {search && (
                  <>
                    {" "}
                    for{" "}
                    <span className="font-semibold text-indigo-600">
                      "{search}"
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Student Grid */}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <StudentCard
                  key={student.user?._id || student._id}
                  id={student.user?._id || student._id}
                  name={student.user?.fullName || "Student"}
                  role={student.course || "Student"}
                  college={student.college || "College not specified"}
                  badge={
                    student.user?.isVerified ? "✓ Verified Student" : "Student"
                  }
                  projects={0}
                  followers={student.followersCount || 0}
                  skills={student.skills || []}
                  profileImage={student.profileImage || ""}
                  github={student.github || ""}
                  linkedin={student.linkedin || ""}
                />
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

export default Students;
