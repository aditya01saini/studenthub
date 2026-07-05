import { FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaGraduationCap className="text-3xl text-indigo-600" />

          <h1 className="text-2xl font-bold text-gray-900">
            Student<span className="text-indigo-600">Hub</span>
          </h1>
        </div>

        {/* Navigation */}
        <ul className="hidden items-center gap-8 font-medium text-gray-700 lg:flex">
          <li className="cursor-pointer transition hover:text-indigo-600">
            Home
          </li>

          <li className="cursor-pointer transition hover:text-indigo-600">
            Features
          </li>

          <li className="cursor-pointer transition hover:text-indigo-600">
            Community
          </li>

          <li className="cursor-pointer transition hover:text-indigo-600">
            Projects
          </li>

          <li className="cursor-pointer transition hover:text-indigo-600">
            Internships
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <button className="rounded-lg px-5 py-2 font-medium text-gray-700 transition hover:text-indigo-600">
            Login
          </button>

          <button className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700">
            Register
          </button>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;