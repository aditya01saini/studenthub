import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { Link } from "react-router-dom";


const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Withdrawn: "bg-slate-200 text-slate-700",
};

const RecentApplicationTable = ({ applications = [] }) => {
  return (
    <Card className="overflow-hidden p-0">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest applications received for your internships.
            </p>
          </div>

          <Link
            to="/recruiter/applications"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View All →
          </Link>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Latest applications received for your internships.
        </p>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No applications found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Internship
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Applied On
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-t border-slate-100">
                  {/* Student */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          application.student?.profileImage ||
                          "https://ui-avatars.com/api/?name=Student"
                        }
                        alt="Student"
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-semibold text-slate-800">
                          {application.student?.user?.fullName}
                        </p>

                        <p className="text-sm text-slate-500">
                          {application.student?.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Internship */}
                  <td className="px-6 py-5 text-slate-700">
                    {application.internship?.title}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <Badge
                      className={
                        statusClasses[application.status] ||
                        "bg-slate-100 text-slate-700"
                      }
                    >
                      {application.status}
                    </Badge>
                  </td>

                  {/* Applied Date */}
                  <td className="px-6 py-5 text-slate-600">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default RecentApplicationTable;
