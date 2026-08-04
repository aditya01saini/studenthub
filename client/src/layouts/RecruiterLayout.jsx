import { Outlet } from "react-router-dom";

import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar";

const RecruiterLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Right Side */}
      <div className="ml-64 min-h-screen">
        {/* Navbar */}
        <RecruiterNavbar />

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;