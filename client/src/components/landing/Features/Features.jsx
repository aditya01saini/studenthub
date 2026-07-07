import {
  FaBookOpen,
  FaFolderOpen,
  FaBriefcase,
  FaUsers,
  FaUserGraduate,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaBookOpen className="text-4xl text-indigo-600" />,
    title: "Notes Sharing",
    description:
      "Upload, download and share study notes with students across India.",
  },
  {
    id: 2,
    icon: <FaFolderOpen className="text-4xl text-indigo-600" />,
    title: "Project Showcase",
    description:
      "Build your portfolio by showcasing your academic and personal projects.",
  },
  {
    id: 3,
    icon: <FaBriefcase className="text-4xl text-indigo-600" />,
    title: "Internship Portal",
    description:
      "Find internships and apply directly through StudentHub.",
  },
  {
    id: 4,
    icon: <FaUsers className="text-4xl text-indigo-600" />,
    title: "Student Community",
    description:
      "Connect with students, share knowledge and grow together.",
  },
  {
    id: 5,
    icon: <FaUserGraduate className="text-4xl text-indigo-600" />,
    title: "Professional Portfolio",
    description:
      "Create a professional profile that recruiters can explore.",
  },
  {
    id: 6,
    icon: <FaBell className="text-4xl text-indigo-600" />,
    title: "Real-time Notifications",
    description:
      "Stay updated with internships, notes and community activities.",
  },
];

const Features = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need In One Platform
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            StudentHub provides all the tools students need to learn,
            collaborate and grow professionally.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
            >
              <div className="mb-6">{feature.icon}</div>

              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;