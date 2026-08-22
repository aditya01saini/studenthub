import {
  FaBookOpen,
  FaFolderOpen,
  FaBriefcase,
  FaUsers,
  FaUserGraduate,
  FaBell,
  FaArrowRight,
} from "react-icons/fa";

import Card from "../../ui/Card";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";

const features = [
  {
    id: 1,
    icon: FaBookOpen,
    title: "Notes Sharing",
    description:
      "Upload, download and share study notes with students across India.",
  },
  {
    id: 2,
    icon: FaFolderOpen,
    title: "Project Showcase",
    description:
      "Build your portfolio by showcasing your academic and personal projects.",
  },
  {
    id: 3,
    icon: FaBriefcase,
    title: "Internship Portal",
    description: "Find internships and apply directly through StudentHub.",
  },
  {
    id: 4,
    icon: FaUsers,
    title: "Student Community",
    description: "Connect with students, share knowledge and grow together.",
  },
  {
    id: 5,
    icon: FaUserGraduate,
    title: "Professional Portfolio",
    description: "Create a professional profile that recruiters can explore.",
  },
  {
    id: 6,
    icon: FaBell,
    title: "Real-time Notifications",
    description:
      "Stay updated with internships, notes and community activities.",
  },
];

const Features = () => {
  return (
    <section className="bg-slate-50 py-12 sm:py-14 lg:py-16">
      <Container>
        {/* Section Title */}

        <SectionTitle
          title="Everything You Need In One Platform"
          subtitle="StudentHub provides all the tools students need to learn, collaborate and grow professionally."
        />

        {/* Features Grid */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.id}
                className="group cursor-pointer border border-slate-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                {/* Icon */}

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-600">
                  <Icon className="text-xl text-indigo-600 transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Title */}

                <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 sm:text-xl">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">
                  {feature.description}
                </p>

                {/* Learn More */}

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                  <span>Learn More</span>

                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;
