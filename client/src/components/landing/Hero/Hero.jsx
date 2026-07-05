const Hero = () => {
  return (
    <section className="bg-slate-50 pt-32 pb-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row">

        {/* Left Side */}
        <div className="flex-1">

          <p className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
            🚀 Build Your Career with StudentHub
          </p>

          <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            The All-in-One Platform <br />
            for <span className="text-indigo-600">Students</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Share Notes, Showcase Projects, Find Internships,
            Connect with Recruiters and Build your Professional Portfolio —
            all in one place.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700">
              Get Started
            </button>

            <button className="rounded-xl border border-gray-300 px-7 py-3 font-semibold transition hover:border-indigo-600 hover:text-indigo-600">
              Explore Features
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-1 justify-center">

          <div className="flex h-[420px] w-[420px] items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-xl">

            <h2 className="text-2xl font-bold text-gray-500">
              Dashboard Preview
            </h2>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;