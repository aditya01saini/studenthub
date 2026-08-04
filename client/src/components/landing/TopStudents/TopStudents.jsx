import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import StudentCard from "../../ui/StudentCard";

const students = [
  {
    id: 1,
    name: "Aditya Saini",
    role: "Full Stack Developer",
    college: "Quantum University",
    badge: "🏆 Top Performer",
    projects: 15,
    followers: 450,
    skills: ["React", "Node", "MongoDB"],
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "React Developer",
    college: "IIT Delhi",
    badge: "⭐ React Expert",
    projects: 12,
    followers: 390,
    skills: ["React", "Redux", "Firebase"],
  },
  {
    id: 3,
    name: "Priya Verma",
    role: "Backend Developer",
    college: "NIT Jaipur",
    badge: "🚀 Backend Pro",
    projects: 18,
    followers: 520,
    skills: ["Node", "Express", "MongoDB"],
  },
];

const TopStudents = () => {
  return (
    <section className="bg-white py-20">
      <Container>

        <SectionTitle
          title="Top Student Contributors"
          subtitle="Meet some of our active students who regularly share projects, notes and help the community."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {students.map((student) => (
            <StudentCard
              key={student.id}
              {...student}
            />
          ))}

        </div>

        <div className="mt-14 flex justify-center">

          <button className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700">
            View All Students →
          </button>

        </div>

      </Container>
    </section>
  );
};

export default TopStudents;