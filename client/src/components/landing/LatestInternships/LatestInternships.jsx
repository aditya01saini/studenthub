import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import InternshipCard from "../../ui/InternshipCard";
import Button from "../../ui/Button";

const internships = [
  {
    id: 1,
    badge: "Featured",
    company: "Google",
    role: "Frontend Developer Intern",
    location: "Bengaluru",
    stipend: "₹25,000 / month",
    duration: "6 Months",
    mode: "Remote",
  },
  {
    id: 2,
    badge: "Trending",
    company: "Microsoft",
    role: "Backend Developer Intern",
    location: "Hyderabad",
    stipend: "₹30,000 / month",
    duration: "3 Months",
    mode: "Hybrid",
  },
  {
    id: 3,
    badge: "Popular",
    company: "Amazon",
    role: "Full Stack Developer Intern",
    location: "Delhi",
    stipend: "₹35,000 / month",
    duration: "6 Months",
    mode: "On-site",
  },
];

const LatestInternships = () => {
  return (
    <section className="bg-white py-20">
      <Container>

        <SectionTitle
          title="Latest Internships"
          subtitle="Discover internship opportunities from top companies."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {internships.map((internship) => (
            <InternshipCard
              key={internship.id}
              {...internship}
            />
          ))}

        </div>

        <div className="mt-14 flex justify-center">

          <Button>
            View All Internships →
          </Button>

        </div>

      </Container>
    </section>
  );
};

export default LatestInternships;