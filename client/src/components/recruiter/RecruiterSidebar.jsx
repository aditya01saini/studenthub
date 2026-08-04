import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaHome,
  FaUser,
  FaClipboardList,
  FaBell,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/recruiter/dashboard",
    icon: FaHome,
  },
  {
    name: "Profile",
    path: "/recruiter/profile",
    icon: FaUser,
  },
  {
    name: "My Internships",
    path: "/recruiter/internships",
    icon: FaBriefcase,
  },
  {
    name: "Create Internship",
    path: "/recruiter/internships/create",
    icon: FaPlusCircle,
  },
  {
    name: "Applications",
    path: "/recruiter/applications",
    icon: FaClipboardList,
  },
  {
    name: "Notifications",
    path: "/recruiter/notifications",
    icon: FaBell,
  },
];

const RecruiterSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <FaBriefcase className="text-3xl text-indigo-600" />

        <h1 className="text-2xl font-bold text-slate-900">
          Student<span className="text-indigo-600">Hub</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                    }`
                  }
                >
                  <Icon className="text-lg" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold text-red-500 transition hover:bg-red-50"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default RecruiterSidebar;