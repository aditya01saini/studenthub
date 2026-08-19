import { Bell, Search, Menu, ChevronDown, Command } from "lucide-react";

const AdminTopbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 lg:hidden"
        >
          <Menu size={19} />
        </button>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
            Overview
          </p>

          <h2 className="text-[17px] font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-all duration-200 hover:border-indigo-200 hover:bg-white md:flex"
        >
          <Search size={16} className="text-slate-400" />

          <span className="w-32 text-left text-xs text-slate-400">
            Search anything...
          </span>

          <span className="ml-2 flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 shadow-sm">
            <Command size={9} />K
          </span>
        </button>

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profile */}
        <button
          type="button"
          className="group flex items-center gap-2 rounded-xl p-1.5 pr-1 transition-all duration-200 hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-sm font-bold text-white shadow-sm">
            A
          </div>

          <div className="hidden text-left md:block">
            <p className="text-[13px] font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-[10px] text-slate-400">Super Admin</p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-slate-400 transition-transform duration-200 group-hover:translate-y-0.5 md:block"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
