import { useEffect, useState } from "react";

import Card from "../../ui/Card";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";

import api from "../../../services/api";

const Statistics = () => {
  const [statistics, setStatistics] = useState({
    students: 0,
    notes: 0,
    projects: 0,
    internships: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH STATISTICS
  // ==========================================

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/statistics");

      setStatistics(
        data.statistics || {
          students: 0,
          notes: 0,
          projects: 0,
          internships: 0,
        },
      );
    } catch (error) {
      console.error("Failed to fetch statistics:", error);

      setError("Unable to load statistics.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchStatistics();
  }, []);

  // ==========================================
  // STATISTICS DATA
  // ==========================================

  const statisticsData = [
    {
      id: 1,
      number: statistics.students,
      suffix: "+",
      title: "Students",
    },
    {
      id: 2,
      number: statistics.notes,
      suffix: "+",
      title: "Notes",
    },
    {
      id: 3,
      number: statistics.projects,
      suffix: "+",
      title: "Projects",
    },
    {
      id: 4,
      number: statistics.internships,
      suffix: "+",
      title: "Internships",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container>
        {/* ==========================================
            SECTION TITLE
        ========================================== */}

        <SectionTitle
          title="Trusted by Students Across India"
          subtitle="Thousands of students use StudentHub to share notes, showcase projects, and discover internships."
        />

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="mx-auto mb-5 max-w-2xl rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {statisticsData.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg sm:p-6"
            >
              {/* Decorative Glow */}

              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-indigo-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* Number */}

              <h3 className="relative text-3xl font-extrabold tracking-tight text-indigo-600 sm:text-4xl">
                {loading ? (
                  <span className="mx-auto inline-block h-9 w-20 animate-pulse rounded-lg bg-slate-200 sm:h-10 sm:w-24" />
                ) : (
                  <>
                    {Number(item.number).toLocaleString("en-IN")}
                    {item.suffix}
                  </>
                )}
              </h3>

              {/* Title */}

              <p className="relative mt-2 text-sm font-semibold text-slate-600 sm:text-base">
                {item.title}
              </p>

              {/* Bottom Accent */}

              <div className="mx-auto mt-4 h-1 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-12" />
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
