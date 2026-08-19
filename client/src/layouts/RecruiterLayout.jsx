import { Outlet } from "react-router-dom";
import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar";

const RecruiterLayout = () => {
  return (
    <div className="bg-slate-100">
      <RecruiterSidebar />

      <div className="ml-72 min-h-screen">
        <RecruiterNavbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
