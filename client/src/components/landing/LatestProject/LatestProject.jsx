import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import ProjectCard from "../../ui/ProjectCard";
import Button from "../../ui/Button";

import api from "../../../services/api";

const LatestProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH LATEST PROJECTS
  // ==========================================

  const fetchLatestProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/projects", {
        params: {
          page: 1,
          limit: 3,
        },
      });

      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch latest projects:", error);

      setError("Unable to load latest projects.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PROJECTS
  // ==========================================

  useEffect(() => {
    fetchLatestProjects();
  }, []);

  // ==========================================
  // VIEW ALL PROJECTS
  // ==========================================

  const handleViewAllProjects = () => {
    navigate("/projects");
  };

  return (
    <section className="bg-slate-50 py-20">
      <Container>
        {/* ==========================================
            SECTION TITLE
        ========================================== */}

        <SectionTitle
          title="Latest Student Projects"
          subtitle="Discover innovative projects created by our talented students."
        />

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading latest projects...
            </p>
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
            <p className="font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchLatestProjects}
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
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-800">
              No projects available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Student projects will appear here once they are uploaded.
            </p>
          </div>
        )}

        {/* ==========================================
            PROJECTS
        ========================================== */}

        {!loading && !error && projects.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW ALL
        ========================================== */}

        <div className="mt-14 flex justify-center">
          <Button onClick={handleViewAllProjects}>View All Projects →</Button>
        </div>
      </Container>
    </section>
  );
};

export default LatestProjects;
