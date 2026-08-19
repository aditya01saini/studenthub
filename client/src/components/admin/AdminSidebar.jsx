import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  BriefcaseBusiness,
  FileText,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  GraduationCap,
  ChevronRight,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
const mainNavigation = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Recruiters",
    path: "/admin/recruiters",
    icon: Building2,
  },
  {
    name: "Internships",
    path: "/admin/internships",
    icon: BriefcaseBusiness,
  },
  {
    name: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
];

const managementNavigation = [
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Community",
    path: "/admin/community",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col border-r border-slate-200/80 bg-white shadow-[10px_0_40px_rgba(15,23,42,0.04)] lg:flex">
        <SidebarContent />
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-slate-200/80 bg-white shadow-2xl lg:hidden"
            >
              <SidebarContent mobile setSidebarOpen={setSidebarOpen} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* =========================================================
   SIDEBAR CONTENT
========================================================= */

const SidebarContent = ({ mobile = false, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <>
      {/* Brand */}
      <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={21} strokeWidth={2.2} />

            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-[17px] font-bold tracking-tight text-slate-900">
              Student<span className="text-indigo-600">Hub</span>
            </h1>

            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Admin Console
            </p>
          </div>
        </div>

        {/* Mobile Close */}
        {mobile && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <NavigationSection
          title="Main"
          items={mainNavigation}
          onNavigate={mobile ? () => setSidebarOpen(false) : undefined}
        />

        <div className="my-7 h-px bg-slate-100" />

        <NavigationSection
          title="Management"
          items={managementNavigation}
          onNavigate={mobile ? () => setSidebarOpen(false) : undefined}
        />
      </div>

      {/* Admin Account */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-[11px] text-slate-400">Super Admin</p>
          </div>

          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.10)]" />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={17}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

/* =========================================================
   NAVIGATION SECTION
========================================================= */

const NavigationSection = ({ title, items, onNavigate }) => {
  return (
    <div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </p>

      <nav className="space-y-1">
        {items.map((item) => (
          <NavigationItem key={item.path} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
    </div>
  );
};

/* =========================================================
   NAVIGATION ITEM
========================================================= */

const NavigationItem = ({ item, onNavigate }) => {
  const Icon = item.icon;

  return (
    <NavLink to={item.path} onClick={onNavigate} className="block">
      {({ isActive }) => (
        <motion.div
          whileHover={{
            x: isActive ? 0 : 3,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.15,
          }}
          className={`
            group
            relative
            flex
            items-center
            gap-3
            overflow-hidden
            rounded-xl
            px-3
            py-3
            text-[13px]
            font-medium
            transition-all
            duration-200
            ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }
          `}
        >
          {isActive && (
            <motion.span
              layoutId="admin-active-indicator"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
              className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white"
            />
          )}

          <Icon
            size={18}
            strokeWidth={isActive ? 2.4 : 1.9}
            className={
              !isActive
                ? "transition-transform duration-200 group-hover:scale-105"
                : ""
            }
          />

          <span className="flex-1">{item.name}</span>

          {isActive && <ChevronRight size={15} className="opacity-80" />}
        </motion.div>
      )}
    </NavLink>
  );
};

export default AdminSidebar;
