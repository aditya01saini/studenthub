import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaGraduationCap,
  FaHome,
  FaUser,
  FaBookOpen,
  FaFolderOpen,
  FaBriefcase,
  FaFileAlt,
  FaUsers,
  FaBell,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: FaHome,
  },
  {
    name: "Profile",
    path: "/student/profile",
    icon: FaUser,
  },
  {
    name: "Notes",
    path: "/student/notes",
    icon: FaBookOpen,
  },
  {
    name: "Projects",
    path: "/student/projects",
    icon: FaFolderOpen,
  },
  {
    name: "Internships",
    path: "/student/internships",
    icon: FaBriefcase,
  },
  {
    name: "Applications",
    path: "/student/applications",
    icon: FaFileAlt,
  },
  {
    name: "Community",
    path: "/student/community",
    icon: FaUsers,
  },
  {
    name: "Notifications",
    path: "/student/notifications",
    icon: FaBell,
  },
];

const StudentSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ==========================================
  // CLOSE SIDEBAR WHEN USER SCROLLS
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      // Only close sidebar on mobile/tablet
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sidebarOpen, setSidebarOpen]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ==========================================
          MOBILE OVERLAY
      ========================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-slate-200
          bg-white shadow-lg
          transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ==========================================
            LOGO
        ========================================== */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex min-w-0 items-center gap-3">
            <FaGraduationCap className="shrink-0 text-3xl text-indigo-600" />

            <h1 className="truncate text-2xl font-bold text-slate-900">
              Student
              <span className="text-indigo-600">Hub</span>
            </h1>
          </div>

          {/* ==========================================
              MOBILE CLOSE BUTTON
          ========================================== */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="
              shrink-0 rounded-lg p-2
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
              lg:hidden
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* ==========================================
            NAVIGATION
        ========================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={({ isActive }) =>
                      `
                        flex items-center gap-3
                        rounded-xl px-4 py-3
                        font-medium
                        transition
                        ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                        }
                      `
                    }
                  >
                    <Icon className="shrink-0 text-lg" />

                    <span className="truncate">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ==========================================
            LOGOUT
        ========================================== */}

        <div className="shrink-0 border-t border-slate-200 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3
              rounded-xl px-4 py-3
              font-semibold
              text-red-500
              transition
              hover:bg-red-50
            "
          >
            <FaSignOutAlt className="shrink-0" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;