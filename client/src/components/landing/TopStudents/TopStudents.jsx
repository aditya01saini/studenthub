import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import StudentCard from "../../ui/StudentCard";

import api from "../../../services/api";

const TopStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH TOP STUDENTS
  // ==========================================

  const fetchTopStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/student/top-students");

      setStudents(data.students || []);
    } catch (error) {
      console.error("Failed to fetch top students:", error);

      setError("Unable to load top students.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchTopStudents();
  }, []);

  // ==========================================
  // VIEW ALL STUDENTS
  // ==========================================

  const handleViewAll = () => {
    navigate("/students");
  };

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container>
        {/* ==========================================
            SECTION TITLE
        ========================================== */}

        <SectionTitle
          title="Top Student Contributors"
          subtitle="Meet some of our active students who regularly share projects, notes and help the community."
        />

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center text-sm text-slate-500">
            Loading top students...
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            EMPTY
        ========================================== */}

        {!loading && !error && students.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No students available right now.
          </div>
        )}

        {/* ==========================================
            STUDENTS
        ========================================== */}

        {!loading && !error && students.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {students.slice(0, 3).map((student) => (
              <StudentCard
                key={student.studentId}
                id={student.studentId}
                name={student.fullName}
                role={student.course || "Student"}
                college={student.college || "College not specified"}
                badge={
                  student.isVerified
                    ? "✓ Verified Student"
                    : "🏆 Top Contributor"
                }
                projects={student.projects || 0}
                followers={student.followersCount || 0}
                skills={student.skills || []}
                profileImage={student.profileImage || ""}
              />
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW ALL
        ========================================== */}

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleViewAll}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
          >
            View All Students →
          </button>
        </div>
      </Container>
    </section>
  );
};

export default TopStudents;
