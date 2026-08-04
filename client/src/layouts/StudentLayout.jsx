import { Outlet } from "react-router-dom";

import StudentSidebar from "../components/student/StudentSidebar";
import StudentNavbar from "../components/student/StudentNavbar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Right Side */}
      <div className="ml-64 min-h-screen">
        {/* Top Navbar */}
        <StudentNavbar />

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
