import { Bell, Search, ChevronDown, Menu } from "lucide-react";

const RecruiterNavbar = ({ onMenuClick }) => {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        min-h-20
        w-full
        items-center
        gap-3
        border-b
        border-slate-200
        bg-white
        px-3
        py-3
        sm:px-6
        lg:px-8
      "
    >
      {/* =========================
          MOBILE MENU BUTTON
      ========================== */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="
          shrink-0
          rounded-xl
          p-2
          text-slate-700
          transition
          hover:bg-slate-100
          lg:hidden
        "
      >
        <Menu size={26} />
      </button>

      {/* =========================
          LEFT - TITLE
      ========================== */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-bold text-slate-800 sm:text-2xl">
          Recruiter Dashboard
        </h2>

        <p className="hidden text-sm text-slate-500 sm:block">
          Welcome back 👋
        </p>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================== */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-56
              rounded-xl
              border
              border-slate-300
              py-2
              pl-11
              pr-4
              outline-none
              transition
              focus:border-indigo-600
              xl:w-72
            "
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="
            relative
            shrink-0
            rounded-xl
            p-2.5
            text-slate-600
            transition
            hover:bg-slate-100
            sm:p-3
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              right-1.5
              top-1.5
              h-2
              w-2
              rounded-full
              bg-red-500
              sm:right-2
              sm:top-2
            "
          />
        </button>

        {/* Recruiter Profile */}
        <button
          type="button"
          className="
            flex
            shrink-0
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-2
            py-2
            transition
            hover:bg-slate-100
            sm:gap-3
            sm:px-3
          "
        >
          <img
            src="https://ui-avatars.com/api/?name=Recruiter"
            alt="Recruiter"
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
          />

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-800">Recruiter</p>

            <p className="text-xs text-slate-500">Company Account</p>
          </div>

          <ChevronDown size={18} className="hidden text-slate-500 sm:block" />
        </button>
      </div>
    </header>
  );
};

export default RecruiterNavbar;
