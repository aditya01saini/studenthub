import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  User,
  Briefcase,
  PlusCircle,
  FileText,
  Bell,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/recruiter/dashboard",
  },
  {
    name: "Profile",
    icon: User,
    path: "/recruiter/profile",
  },
  {
    name: "My Internships",
    icon: Briefcase,
    path: "/recruiter/internships",
  },
  {
    name: "Applications",
    icon: FileText,
    path: "/recruiter/applications",
  },
  {
    name: "Post Internship",
    icon: PlusCircle,
    path: "/recruiter/internships/create",
  },

  {
    name: "Notifications",
    icon: Bell,
    path: "/recruiter/notifications",
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
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <h1 className="text-2xl font-bold text-indigo-600">StudentHub</h1>

        <p className="mt-1 text-sm text-slate-500">Recruiter Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default RecruiterSidebar;
