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
    <section className="bg-slate-50 py-12 sm:py-14 lg:py-16">
      <Container>
        {/* Section Title */}

        <SectionTitle
          title="How StudentHub Works"
          subtitle="Follow these simple steps to start your learning and career journey."
        />

        {/* Steps */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <StepCard
                icon={step.icon}
                title={step.title}
                description={step.description}
              />

              {/* Step Number */}

              <div className="pointer-events-none absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;