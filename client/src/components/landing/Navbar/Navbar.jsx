import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaRobot,
  FaFileAlt,
} from "react-icons/fa";

import Button from "../../ui/Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // ==========================================
  // HOME CLICK
  // ==========================================

  const handleHomeClick = () => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/";
    }
  };

  // ==========================================
  // FEATURES CLICK
  // ==========================================

  const handleFeaturesClick = () => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      window.location.href = "/#features";
      return;
    }

    const featuresSection = document.getElementById("features");

    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      {/* ==========================================
          NAVBAR CONTAINER
      ========================================== */}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ==========================================
            LOGO
        ========================================== */}

        <button
          type="button"
          onClick={handleHomeClick}
          className="flex items-center gap-2"
        >
          <FaGraduationCap className="text-2xl text-indigo-600 sm:text-3xl" />

          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Student
            <span className="text-indigo-600">Hub</span>
          </h1>
        </button>

        {/* ==========================================
            DESKTOP NAVIGATION
        ========================================== */}

        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {/* HOME */}

          <li>
            <button
              type="button"
              onClick={handleHomeClick}
              className={`text-sm font-semibold transition-colors duration-200 xl:text-base ${
                location.pathname === "/"
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              }`}
            >
              Home
            </button>
          </li>

          {/* FEATURES */}

          <li>
            <button
              type="button"
              onClick={handleFeaturesClick}
              className="text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-indigo-600 xl:text-base"
            >
              Features
            </button>
          </li>

          {/* PROJECTS */}

          <li>
            <Link
              to="/projects"
              className={`text-sm font-semibold transition-colors duration-200 xl:text-base ${
                location.pathname.startsWith("/projects")
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              }`}
            >
              Projects
            </Link>
          </li>

          {/* INTERNSHIPS */}

          <li>
            <Link
              to="/internships"
              className={`text-sm font-semibold transition-colors duration-200 xl:text-base ${
                location.pathname.startsWith("/internships")
                  ? "text-indigo-600"
                  : "text-slate-700 hover:text-indigo-600"
              }`}
            >
              Internships
            </Link>
          </li>

          {/* AI ASSISTANT */}

          <li>
            <Link
              to="/ai-chat"
              className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-700 xl:text-base"
            >
              <FaRobot />
              <span>AI Assistant</span>
            </Link>
          </li>

          {/* ==========================================
              RESUME ANALYZER
          ========================================== */}

          <li>
            <Link
              to="/resume-analyzer"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 xl:text-base ${
                location.pathname === "/resume-analyzer"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
              }`}
            >
              <FaFileAlt />
              <span>Resume Analyzer</span>
            </Link>
          </li>
        </ul>

        {/* ==========================================
            DESKTOP BUTTONS
        ========================================== */}

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login">
            <Button variant="secondary" className="px-5 py-2.5 text-sm">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="px-5 py-2.5 text-sm">Register</Button>
          </Link>
        </div>

        {/* ==========================================
            MOBILE MENU BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-lg p-2 text-2xl text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-200 bg-white px-5 py-5">
          <ul className="flex flex-col gap-3">
            {/* HOME */}

            <li>
              <button
                type="button"
                onClick={handleHomeClick}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Home
              </button>
            </li>

            {/* FEATURES */}

            <li>
              <button
                type="button"
                onClick={handleFeaturesClick}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Features
              </button>
            </li>

            {/* PROJECTS */}

            <li>
              <Link
                to="/projects"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Projects
              </Link>
            </li>

            {/* INTERNSHIPS */}

            <li>
              <Link
                to="/internships"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                Internships
              </Link>
            </li>

            {/* AI ASSISTANT */}

            <li>
              <Link
                to="/ai-chat"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2.5 text-base font-semibold text-indigo-600 transition hover:bg-indigo-100 hover:text-indigo-700"
              >
                <FaRobot />
                <span>AI Assistant</span>
              </Link>
            </li>

            {/* ==========================================
                RESUME ANALYZER
            ========================================== */}

            <li>
              <Link
                to="/resume-analyzer"
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold transition ${
                  location.pathname === "/resume-analyzer"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
                }`}
              >
                <FaFileAlt />
                <span>Resume Analyzer</span>
              </Link>
            </li>
          </ul>

          {/* ==========================================
              MOBILE BUTTONS
          ========================================== */}

          <div className="mt-5 flex flex-col gap-3">
            <Link to="/login" onClick={closeMenu}>
              <Button variant="secondary" className="w-full justify-center">
                Login
              </Button>
            </Link>

            <Link to="/register" onClick={closeMenu}>
              <Button className="w-full justify-center">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
