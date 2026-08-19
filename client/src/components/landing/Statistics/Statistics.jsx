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
    <section className="bg-white py-20">
      <Container>
        <SectionTitle
          title="Trusted by Students Across India"
          subtitle="Thousands of students use StudentHub to share notes, showcase projects, and discover internships."
        />

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statisticsData.map((item) => (
            <Card key={item.id} className="text-center">
              <h3 className="text-4xl font-bold text-indigo-600">
                {loading ? (
                  <span className="inline-block h-10 w-24 animate-pulse rounded-lg bg-slate-200" />
                ) : (
                  <>
                    {item.number.toLocaleString("en-IN")}
                    {item.suffix}
                  </>
                )}
              </h3>

              <p className="mt-3 text-lg font-medium text-slate-600">
                {item.title}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
