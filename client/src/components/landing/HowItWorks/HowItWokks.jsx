import {
  FaUserPlus,
  FaUserEdit,
  FaUpload,
  FaBriefcase,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus className="text-5xl text-indigo-600" />,
    title: "Create Account",
    description:
      "Sign up as a Student or Recruiter and join the StudentHub community.",
  },
  {
    id: 2,
    icon: <FaUserEdit className="text-5xl text-indigo-600" />,
    title: "Complete Profile",
    description:
      "Add your skills, education, resume and portfolio details.",
  },
  {
    id: 3,
    icon: <FaUpload className="text-5xl text-indigo-600" />,
    title: "Share & Explore",
    description:
      "Upload notes, showcase projects and connect with other students.",
  },
  {
    id: 4,
    icon: <FaBriefcase className="text-5xl text-indigo-600" />,
    title: "Apply for Internships",
    description:
      "Find internships, apply directly and start your professional journey.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            How StudentHub Works
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Follow these simple steps to start your learning and career journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex justify-center">
                {step.icon}
              </div>

              <div className="mb-4 flex justify-center">
                <span className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                  Step {step.id}
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;