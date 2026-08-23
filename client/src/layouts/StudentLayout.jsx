import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import StudentSidebar from "../components/student/StudentSidebar";
import StudentNavbar from "../components/student/StudentNavbar";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* Sidebar */}
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div
        className={`min-h-screen min-w-0 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Mobile / Desktop Toggle */}
        <div className="fixed left-4 top-4 z-[60] lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-md hover:bg-indigo-50 hover:text-indigo-600"
          >
            <FaBars />
          </button>
        </div>

        {/* Navbar */}
        <StudentNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
