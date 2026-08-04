import { Link } from "react-router-dom";
import { FaUserGraduate, FaBuilding } from "react-icons/fa";

import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";

const ChooseRole = () => {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create Your Account"
        subtitle="Choose how you want to join StudentHub."
      />

      <div className="space-y-6">

        {/* Student */}

        <Link
          to="/register/student"
          className="block rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-600 hover:shadow-lg"
        >
          <div className="flex items-start gap-5">

            <div className="rounded-xl bg-indigo-100 p-4">
              <FaUserGraduate className="text-3xl text-indigo-600" />
            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-900">
                Student
              </h3>

              <p className="mt-2 text-slate-600">
                Share notes, showcase projects,
                build your portfolio and apply for internships.
              </p>

            </div>

          </div>

        </Link>

        {/* Recruiter */}

        <Link
          to="/register/recruiter"
          className="block rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-600 hover:shadow-lg"
        >
          <div className="flex items-start gap-5">

            <div className="rounded-xl bg-indigo-100 p-4">
              <FaBuilding className="text-3xl text-indigo-600" />
            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-900">
                Recruiter
              </h3>

              <p className="mt-2 text-slate-600">
                Post internships, discover talented students,
                and hire future professionals.
              </p>

            </div>

          </div>

        </Link>

      </div>
    </AuthLayout>
  );
};

export default ChooseRole;