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
    description:
      "Find internships and apply directly through StudentHub.",
  },
  {
    id: 4,
    icon: FaUsers,
    title: "Student Community",
    description:
      "Connect with students, share knowledge and grow together.",
  },
  {
    id: 5,
    icon: FaUserGraduate,
    title: "Professional Portfolio",
    description:
      "Create a professional profile that recruiters can explore.",
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
    <section className="bg-slate-50 py-20">
      <Container>

        <SectionTitle
          title="Everything You Need In One Platform"
          subtitle="StudentHub provides all the tools students need to learn, collaborate and grow professionally."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.id}
                className="group cursor-pointer border border-transparent text-left hover:border-indigo-200"
              >

                {/* Icon */}

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600">

                  <Icon className="text-3xl text-indigo-600 transition-all duration-300 group-hover:text-white" />

                </div>

                {/* Title */}

                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="leading-7 text-slate-600">
                  {feature.description}
                </p>

                {/* Learn More */}

                <div className="mt-8 flex items-center gap-2 font-semibold text-indigo-600">

                  Learn More

                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />

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