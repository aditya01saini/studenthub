import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import InternshipCard from "../../ui/InternshipCard";
import Button from "../../ui/Button";

import api from "../../../services/api";

const LatestInternships = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH LATEST INTERNSHIPS
  // ==========================================

  const fetchLatestInternships = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/internships", {
        params: {
          page: 1,
          limit: 3,
          sort: "latest",
        },
      });

      setInternships(data.internships || []);
    } catch (error) {
      console.error("Failed to fetch latest internships:", error);

      setError("Unable to load latest internships.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchLatestInternships();
  }, []);

  // ==========================================
  // VIEW ALL INTERNSHIPS
  // ==========================================

  const handleViewAll = () => {
    navigate("/internships");
  };

  return (
    <section className="bg-white py-14">
      <Container>
        {/* ==========================================
            SECTION TITLE
        ========================================== */}

        <SectionTitle
          title="Latest Internships"
          subtitle="Discover internship opportunities from top companies."
        />

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
            Loading latest internships...
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-8 text-center text-red-600">
            <p>{error}</p>

            <button
              type="button"
              onClick={fetchLatestInternships}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ==========================================
            EMPTY
        ========================================== */}

        {!loading && !error && internships.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
            No internships available right now.
          </div>
        )}

        {/* ==========================================
            INTERNSHIPS
        ========================================== */}

        {!loading && !error && internships.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internships.map((internship) => (
              <InternshipCard
                key={internship._id}
                id={internship._id}
                title={internship.title}
                role={internship.title}
                company={internship.recruiter?.companyName || "Company"}
                location={internship.location || "Location not specified"}
                stipend={
                  internship.stipend ? `₹${internship.stipend}` : "Unpaid"
                }
                duration={internship.duration || "Not specified"}
                mode={internship.workMode || "Not specified"}
                badge={internship.isFeatured ? "Featured" : "Latest"}
              />
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW ALL
        ========================================== */}

        <div className="mt-10 flex justify-center">
          <Button type="button" onClick={handleViewAll}>
            View All Internships →
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LatestInternships;
