import { useEffect, useState } from "react";

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

  const [isScrolled, setIsScrolled] = useState(false);

  // ==========================================
  // DETECT PAGE / CONTAINER SCROLL
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      setIsScrolled(scrollTop > 20);
    };

    // Capture scroll events from window + inner containers
    document.addEventListener("scroll", handleScroll, true);

    // Check initial position
    handleScroll();

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // ==========================================
  // TOGGLE SIDEBAR
  // ==========================================

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <header
      className="
        sticky top-0 z-30
        flex min-h-20 items-center justify-between
        border-b border-slate-200
        bg-white
        px-4 py-3
        sm:px-6
        lg:px-8
      "
    >
      {/* ==========================================
          LEFT
      ========================================== */}

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {/* ==========================================
            MOBILE HAMBURGER
        ========================================== */}

        <button
          type="button"
          onClick={handleToggleSidebar}
          aria-label="Open sidebar"
          title="Open Sidebar"
          className={`
            h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
            shadow-sm
            transition-all duration-200
            hover:bg-indigo-100
            hover:text-indigo-600
            lg:hidden

            ${isScrolled ? "hidden" : "flex"}
          `}
        >
          <FaBars className="text-lg" />
        </button>

        {/* ==========================================
            DESKTOP SIDEBAR TOGGLE
        ========================================== */}

        <button
          type="button"
          onClick={handleToggleSidebar}
          title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          className="
            hidden
            h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
            transition
            hover:bg-indigo-100
            hover:text-indigo-600
            lg:flex
          "
        >
          {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* ==========================================
            WELCOME
        ========================================== */}

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
            Welcome back, {user?.fullName || "Student"}
          </h2>

          <p className="mt-1 hidden text-sm text-slate-500 sm:block">
            Manage your learning and career journey.
          </p>
        </div>
      </div>

      {/* ==========================================
          RIGHT
      ========================================== */}

      <div className="ml-3 flex shrink-0 items-center gap-3 sm:gap-5">
        {/* Notification */}
        <button
          type="button"
          className="
            relative rounded-full
            bg-slate-100 p-3
            text-slate-600
            transition
            hover:bg-indigo-100
            hover:text-indigo-600
          "
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
