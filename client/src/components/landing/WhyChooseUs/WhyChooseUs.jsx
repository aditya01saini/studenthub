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
    <section className="bg-white py-20">
      <Container>

        <SectionTitle
          title="Why Choose StudentHub?"
          subtitle="Everything you need to learn, build your portfolio and launch your career from one platform."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}

          <div className="space-y-8">

            {reasons.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="group flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-lg"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 transition-all duration-300 group-hover:bg-indigo-600">

                    <Icon className="text-3xl text-indigo-600 transition-all duration-300 group-hover:text-white" />

                  </div>

                  <div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {item.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Right Side */}

          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            <h3 className="text-3xl font-bold">
              StudentHub
            </h3>

            <p className="mt-3 text-indigo-100">
              One platform for learning, networking and career growth.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-300" />
                <span>15,000+ Active Students</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-300" />
                <span>1,200+ Projects Shared</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-300" />
                <span>5,000+ Notes Available</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-300" />
                <span>250+ Internship Opportunities</span>
              </div>

            </div>

            <div className="mt-10 rounded-2xl bg-white/10 p-6 backdrop-blur">

              <p className="text-sm uppercase tracking-widest text-indigo-200">
                Student Success
              </p>

              <h2 className="mt-2 text-5xl font-bold">
                98%
              </h2>

              <p className="mt-2 text-indigo-100">
                Students recommend StudentHub for learning, networking and career growth.
              </p>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default WhyChooseUs;