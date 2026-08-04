import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 pt-32 pb-20">
      {/* Background Blur */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl"></div>

      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">
        {/* Left Side */}

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}

          <p className="mb-6 inline-flex items-center rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
            🚀 Build Your Career with StudentHub
          </p>

          {/* Heading */}

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-6xl">
            The All-in-One Platform
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Students
            </span>
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Share Notes, Showcase Projects, Find Internships, Connect with
            Recruiters and Build your Professional Portfolio — all in one place.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex justify-center flex-wrap gap-5">
            <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              Get Started
            </button>

            <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Right Side */}

        <motion.div
          className="flex flex-1 justify-center lg:justify-end"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative flex h-[430px] w-[430px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(79,70,229,0.25)]">
            {/* Top */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Dashboard</h3>

                <p className="text-sm ml-2 text-slate-500">Student Overview</p>
              </div>

              <div className="rounded-xl bg-indigo-100 p-3 text-2xl">📊</div>
            </div>

            {/* Cards */}

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Active Projects</p>

                <h2 className="mt-1 text-3xl font-bold text-indigo-600">12</h2>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Internships Applied</p>

                <h2 className="mt-1 text-3xl font-bold text-purple-600">8</h2>
              </div>

              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm text-slate-500">Profile Completion</p>

                <div className="mt-3 h-3 w-full rounded-full bg-slate-200">
                  <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                </div>

                <p className="mt-2 text-sm font-medium text-slate-600">
                  80% Complete
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
