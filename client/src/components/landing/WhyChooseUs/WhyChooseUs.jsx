import {
  FaRocket,
  FaGraduationCap,
  FaUsers,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";

const reasons = [
  {
    id: 1,
    icon: FaRocket,
    title: "Career Growth",
    description:
      "Build your portfolio, showcase projects and grab internship opportunities.",
  },
  {
    id: 2,
    icon: FaGraduationCap,
    title: "Learn Together",
    description:
      "Access quality notes and collaborate with students across India.",
  },
  {
    id: 3,
    icon: FaUsers,
    title: "Strong Community",
    description:
      "Connect with students, mentors and recruiters to grow faster.",
  },
  {
    id: 4,
    icon: FaShieldAlt,
    title: "Trusted Platform",
    description:
      "Safe, secure and specially designed for students and recruiters.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container>
        {/* Section Title */}

        <SectionTitle
          title="Why Choose StudentHub?"
          subtitle="Everything you need to learn, build your portfolio and launch your career from one platform."
        />

        {/* Main Content */}

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <div className="space-y-4">
            {reasons.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:p-5"
                >
                  {/* Icon */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 transition-all duration-300 group-hover:bg-indigo-600">
                    <Icon className="text-xl text-indigo-600 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {/* Content */}

                  <div>
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==========================================
              RIGHT SIDE
          ========================================== */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-7 text-white shadow-xl sm:p-8">
            {/* Decorative Circle */}

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative">
              {/* Heading */}

              <h3 className="text-2xl font-bold sm:text-3xl">StudentHub</h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-indigo-100 sm:text-base">
                One platform for learning, networking and career growth.
              </p>

              {/* Benefits */}

              <div className="mt-7 space-y-3.5">
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <FaCheckCircle className="shrink-0 text-green-300" />
                  <span>15,000+ Active Students</span>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <FaCheckCircle className="shrink-0 text-green-300" />
                  <span>1,200+ Projects Shared</span>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <FaCheckCircle className="shrink-0 text-green-300" />
                  <span>5,000+ Notes Available</span>
                </div>

                <div className="flex items-center gap-3 text-sm sm:text-base">
                  <FaCheckCircle className="shrink-0 text-green-300" />
                  <span>250+ Internship Opportunities</span>
                </div>
              </div>

              {/* Success Card */}

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
                  Student Success
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <h2 className="text-4xl font-extrabold sm:text-5xl">98%</h2>

                  <span className="mb-1 text-sm text-indigo-200">
                    satisfaction
                  </span>
                </div>

                <p className="mt-2 text-sm leading-5 text-indigo-100">
                  Students recommend StudentHub for learning, networking and
                  career growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
