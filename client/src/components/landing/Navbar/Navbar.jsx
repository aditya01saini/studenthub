import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import Button from "../../ui/Button";

const navLinks = ["Home", "Features", "Community", "Projects", "Internships"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex cursor-pointer items-center gap-3">
          <FaGraduationCap className="text-3xl text-indigo-600" />

          <h1 className="text-2xl font-bold text-slate-900">
            Student
            <span className="text-indigo-600">Hub</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <li
              key={item}
              className="cursor-pointer font-medium text-slate-700 transition-all duration-300 hover:text-indigo-600"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-4xl mr-2 text-slate-700 transition lg:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-200 bg-white px-6 py-6">
          <ul className="flex flex-col gap-5">
            {navLinks.map((item) => (
              <li
                key={item}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-lg font-medium text-slate-700 transition hover:text-indigo-600"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4">
            <Link to="/login">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button className="w-full" onClick={() => setMenuOpen(false)}>
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
