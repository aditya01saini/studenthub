import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import TestimonialCard from "../../ui/TestimonialCard";
import Button from "../../ui/Button";

const testimonials = [
  {
    id: 1,
    name: "Aditya Saini",
    role: "Full Stack Developer",
    college: "Quantum University",
    rating: 5,
    review:
      "StudentHub helped me build my portfolio and land my first internship. The platform is simple and very useful.",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "React Developer",
    college: "IIT Delhi",
    rating: 5,
    review:
      "Sharing projects and connecting with other students has become much easier with StudentHub.",
  },
  {
    id: 3,
    name: "Priya Verma",
    role: "Backend Developer",
    college: "NIT Jaipur",
    rating: 5,
    review:
      "The internship section is amazing. I found opportunities from top companies in one place.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-50 py-14">
      <Container>
        {/* Section Title */}

        <SectionTitle
          title="What Students Say"
          subtitle="Hear from students who are already using StudentHub to learn, collaborate and grow."
        />

        {/* Testimonials */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>

        {/* View All */}

        <div className="mt-10 flex justify-center">
          <Button type="button">View All Reviews →</Button>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
