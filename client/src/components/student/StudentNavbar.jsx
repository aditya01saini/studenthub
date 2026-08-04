import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const StudentNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Welcome back, {user?.fullName || "Student"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your learning and career journey.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button
          type="button"
          className="relative rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600"
        >
          <FaBell />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-indigo-600" />

          <div className="hidden sm:block">
            <p className="font-semibold text-slate-900">
              {user?.fullName || "Student"}
            </p>

            <p className="text-sm capitalize text-slate-500">
              {user?.role || "student"}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default StudentNavbar;