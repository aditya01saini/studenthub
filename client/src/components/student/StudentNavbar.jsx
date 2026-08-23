import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const StudentNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Desktop Sidebar Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600 lg:flex"
          title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
            Welcome back, {user?.fullName || "Student"}
          </h2>

          <p className="mt-1 hidden text-sm text-slate-500 sm:block">
            Manage your learning and career journey.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="ml-3 flex shrink-0 items-center gap-3 sm:gap-5">
        {/* Notification */}
        <button
          type="button"
          className="relative rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600"
        >
          <FaBell />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-3xl text-indigo-600 sm:text-4xl" />

          <div className="hidden sm:block">
            <p className="font-semibold text-slate-900">
              {user?.fullName || "Student"}
            </p>

            <p className="text-sm capitalize text-slate-500">
              {user?.role || "student"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentNavbar;
