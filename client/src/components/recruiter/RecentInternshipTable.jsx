import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

const RecentInternshipTable = ({ internships = [] }) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Internships
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest posted internships.
          </p>
        </div>

        <Link
          to="/recruiter/internships"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          View All →
        </Link>
      </div>

      {internships.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No internships found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Applicants
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Views
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {internships.map((internship) => (
                <tr key={internship._id} className="border-t border-slate-100">
                  <td className="px-6 py-5 font-medium text-slate-800">
                    {internship.title}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {internship.category}
                  </td>

                  <td className="px-6 py-5">{internship.applicantsCount}</td>

                  <td className="px-6 py-5">{internship.viewsCount}</td>

                  <td className="px-6 py-5">
                    <Badge
                      className={
                        internship.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {internship.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      to={`/recruiter/internships/edit/${internship._id}`}
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Edit
                    </Link>
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

export default RecentInternshipTable;
