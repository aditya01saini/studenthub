import { FaBell, FaUserCircle } from "react-icons/fa";

const RecruiterNavbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Recruiter Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Manage your internships and applications.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="relative rounded-full bg-slate-100 p-3 transition hover:bg-slate-200"
        >
          <FaBell className="text-lg text-slate-700" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2 transition hover:bg-slate-50"
        >
          <FaUserCircle className="text-3xl text-indigo-600" />

          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">
              Recruiter
            </p>

            <p className="text-xs text-slate-500">
              Company Account
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default RecruiterNavbar;