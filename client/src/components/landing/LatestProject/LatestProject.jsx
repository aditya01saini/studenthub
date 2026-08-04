import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import ProjectCard from "../../ui/ProjectCard.jsx";
import Button from "../../ui/Button";

const projects = [
  {
    id: 1,
    badge: "🔥 Featured",
    title: "Student Management System",
    tech: ["React", "Node.js", "MongoDB"],
    description:
      "A full-stack application for managing student records and attendance.",
  },
  {
    id: 2,
    badge: "⭐ Trending",
    title: "Weather Dashboard",
    tech: ["React", "OpenWeather API", "Tailwind CSS"],
    description:
      "A responsive weather application with real-time forecast updates.",
  },
  {
    id: 3,
    badge: "🚀 Popular",
    title: "Expense Tracker",
    tech: ["React", "Express", "MongoDB"],
    description:
      "Track income, expenses and monthly spending with analytics.",
  },
];

const LatestProjects = () => {
  return (
    <section className="bg-slate-50 py-20">
      <Container>
        <SectionTitle
          title="Latest Student Projects"
          subtitle="Discover innovative projects created by our talented students."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button>
            View All Projects →
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LatestProjects;