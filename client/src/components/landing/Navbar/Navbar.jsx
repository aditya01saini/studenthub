import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import Button from "../../ui/Button";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Features",
    path: "/#features",
  },
  {
    name: "Community",
    path: "/community",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Internships",
    path: "/internships",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      {/* ==========================================
          NAVBAR CONTAINER
      ========================================== */}

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ==========================================
            LOGO
        ========================================== */}

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <FaGraduationCap className="text-2xl text-indigo-600 sm:text-3xl" />

          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Student
            <span className="text-indigo-600">Hub</span>
          </h1>
        </Link>

        {/* ==========================================
            DESKTOP NAVIGATION
        ========================================== */}

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-indigo-600 xl:text-base"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ==========================================
            DESKTOP BUTTONS
        ========================================== */}

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login">
            <Button
              variant="secondary"
              className="px-5 py-2.5 text-sm"
            >
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button className="px-5 py-2.5 text-sm">
              Register
            </Button>
          </Link>
        </div>

        {/* ==========================================
            MOBILE MENU BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
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
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-200 bg-white px-5 py-5">
          
          {/* Mobile Links */}

          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Buttons */}

          <div className="mt-5 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              <Button
                variant="secondary"
                className="w-full justify-center"
              >
                Login
              </Button>
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
            >
              <Button className="w-full justify-center">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;