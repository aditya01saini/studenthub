import {
  FaRocket,
  FaGraduationCap,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: <FaRocket className="text-5xl text-indigo-600" />,
    title: "Career Growth",
    description:
      "Build your portfolio, showcase projects and grab internship opportunities.",
  },
  {
    id: 2,
    icon: <FaGraduationCap className="text-5xl text-indigo-600" />,
    title: "Learn Together",
    description:
      "Access quality notes and collaborate with students from different colleges.",
  },
  {
    id: 3,
    icon: <FaUsers className="text-5xl text-indigo-600" />,
    title: "Strong Community",
    description:
      "Connect with students, share ideas and help each other grow professionally.",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-5xl text-indigo-600" />,
    title: "Trusted Platform",
    description:
      "A secure platform designed especially for students and recruiters.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose StudentHub?
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Everything you need to learn, build your portfolio and grow your
            career in one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {reasons.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-gray-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
            >
              <div className="mb-6 flex justify-center">
                {item.icon}
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;