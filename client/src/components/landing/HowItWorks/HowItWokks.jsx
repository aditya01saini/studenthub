import {
  FaUserPlus,
  FaUserEdit,
  FaUpload,
  FaBriefcase,
} from "react-icons/fa";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import StepCard from "../../ui/StepCard";

const steps = [
  {
    id: 1,
    icon: FaUserPlus,
    title: "Create Account",
    description:
      "Sign up as a Student or Recruiter and join the StudentHub community.",
  },
  {
    id: 2,
    icon: FaUserEdit,
    title: "Complete Profile",
    description:
      "Add your skills, education, resume and portfolio details.",
  },
  {
    id: 3,
    icon: FaUpload,
    title: "Share & Explore",
    description:
      "Upload notes, showcase projects and connect with other students.",
  },
  {
    id: 4,
    icon: FaBriefcase,
    title: "Apply Internship",
    description:
      "Find internships, apply directly and start your professional journey.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-20">
      <Container>

        <SectionTitle
          title="How StudentHub Works"
          subtitle="Follow these simple steps to start your learning and career journey."
        />

        <div className="grid gap-10 lg:grid-cols-2">

          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}

        </div>

      </Container>
    </section>
  );
};

export default HowItWorks;