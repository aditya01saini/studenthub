import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-16">
      {/* Background Blur */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-300/25 blur-3xl sm:h-72 sm:w-72" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-300/25 blur-3xl sm:h-80 sm:w-80" />

      {/* Main Container */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:gap-12 lg:px-8">
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <motion.div
          className="w-full flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}

          <p className="mb-4 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm sm:text-sm">
            🚀 Build Your Career with StudentHub
          </p>

          {/* Heading */}

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
            The All-in-One Platform
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              for Students
            </span>
          </h1>

          {/* Description */}

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
            Share Notes, Showcase Projects, Find Internships, Connect with
            Recruiters and Build your Professional Portfolio — all in one place.
          </p>

          {/* Buttons */}

          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
            {/* Get Started */}

            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:px-7"
            >
              Get Started
            </Link>

            {/* Resume Analyzer */}

            <Link
              to="/resume-analyzer"
              className="rounded-xl border border-indigo-200 bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md sm:px-7"
            >
              🤖 Analyze My Resume
            </Link>

            {/* Explore Features */}

            <a
              href="#features"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md sm:px-7"
            >
              Explore Features
            </a>
          </div>

          {/* Small Trust Indicators */}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 lg:justify-start sm:text-sm">
            <span>✓ Student Community</span>
            <span>✓ AI Resume Analyzer</span>
            <span>✓ Project Showcase</span>
            <span>✓ Internship Opportunities</span>
          </div>
        </motion.div>

        {/* =====================================================
            RIGHT DASHBOARD PREVIEW
        ===================================================== */}

        <motion.div
          className="flex w-full flex-1 justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="relative w-full max-w-[360px] sm:max-w-[390px] lg:max-w-[400px]">
            {/* Glow */}

            <div className="absolute inset-4 rounded-3xl bg-indigo-400/20 blur-2xl" />

            {/* Dashboard */}

            <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-5">
              {/* Dashboard Header */}

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    StudentHub
                  </p>

                  <h3 className="mt-0.5 text-lg font-bold text-slate-800 sm:text-xl">
                    Dashboard
                  </h3>

                  <p className="text-xs text-slate-500 sm:text-sm">
                    Student Overview
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg sm:h-11 sm:w-11 sm:text-xl">
                  📊
                </div>
              </div>

              {/* Dashboard Cards */}

              <div className="space-y-3">
                {/* Projects */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500 sm:text-sm">
                      Active Projects
                    </p>

                    <span className="text-xs font-semibold text-emerald-600">
                      +12%
                    </span>
                  </div>

                  <h2 className="mt-1 text-2xl font-bold text-indigo-600 sm:text-3xl">
                    12
                  </h2>
                </div>

                {/* Internships */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-purple-100 hover:bg-purple-50/40">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500 sm:text-sm">
                      Internships Applied
                    </p>

                    <span className="text-xs font-semibold text-purple-600">
                      2026
                    </span>
                  </div>

                  <h2 className="mt-1 text-2xl font-bold text-purple-600 sm:text-3xl">
                    8
                  </h2>
                </div>

                {/* Profile */}

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500 sm:text-sm">
                      Profile Completion
                    </p>

                    <span className="text-xs font-bold text-indigo-600">
                      80%
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />
                  </div>

                  <p className="mt-2 text-xs font-medium text-slate-500">
                    Keep your profile updated
                  </p>
                </div>
              </div>

              {/* Bottom Stats */}

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-800">24</p>
                  <p className="text-[10px] text-slate-400">
                    Applications
                  </p>
                </div>

                <div className="border-x border-slate-100 text-center">
                  <p className="text-sm font-bold text-slate-800">18</p>
                  <p className="text-[10px] text-slate-400">
                    Skills
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-bold text-slate-800">92%</p>
                  <p className="text-[10px] text-slate-400">
                    Profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

