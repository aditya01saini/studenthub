import {
  FaGraduationCap,
  FaBookOpen,
  FaBriefcase,
  FaFolderOpen,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaBookOpen />,
    title: "Share Notes",
    description: "Access and share quality study notes.",
  },
  {
    id: 2,
    icon: <FaFolderOpen />,
    title: "Showcase Projects",
    description: "Build an impressive portfolio.",
  },
  {
    id: 3,
    icon: <FaBriefcase />,
    title: "Find Internships",
    description: "Apply to internships from top companies.",
  },
];

const AuthLayout = ({ children }) => {
  return (
    <section className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">

          {/* Left Panel */}

          <div className="hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <FaGraduationCap className="text-4xl" />

                <h1 className="text-3xl font-bold">
                  StudentHub
                </h1>
              </div>

              <h2 className="mt-14 text-5xl font-bold leading-tight">
                Build Your
                <br />
                Career With
                <br />
                StudentHub
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
                Join thousands of students sharing notes,
                showcasing projects and landing internships.
              </p>
            </div>

            <div className="space-y-5">

              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  <div className="mb-3 text-2xl">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-indigo-100">
                    {feature.description}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* Right Panel */}

          <div className="flex items-center justify-center p-8 md:p-14">

            <div className="w-full max-w-md">

              {children}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AuthLayout;