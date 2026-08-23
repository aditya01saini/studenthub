import { useState } from "react";
import { Outlet } from "react-router-dom";

import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar";

const RecruiterLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <RecruiterSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen w-full lg:ml-72 lg:w-[calc(100%-18rem)]">
        {/* Navbar */}
        <RecruiterNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="w-full p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
