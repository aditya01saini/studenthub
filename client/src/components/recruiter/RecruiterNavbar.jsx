import { Bell, Search, ChevronDown } from "lucide-react";

const RecruiterNavbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Recruiter Dashboard
        </h2>

        <p className="text-sm text-slate-500">Welcome back 👋</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 py-2 pl-11 pr-4 outline-none transition focus:border-indigo-600"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl p-3 transition hover:bg-slate-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Recruiter */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-100">
          <img
            src="https://ui-avatars.com/api/?name=Recruiter"
            alt="Recruiter"
            className="h-10 w-10 rounded-full"
          />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-slate-800">Recruiter</p>

            <p className="text-xs text-slate-500">Company Account</p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
};

export default RecruiterNavbar;
