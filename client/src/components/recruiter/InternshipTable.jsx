import { Link } from "react-router-dom";
import { Pencil, Trash2, Users } from "lucide-react";

const InternshipTable = ({ internships, onDelete }) => {
  if (!internships.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h3 className="text-xl font-semibold text-slate-800">
          No Internships Found
        </h3>

        <p className="mt-2 text-slate-500">
          Start by posting your first internship.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Work Mode
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stipend
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Applicants
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {internships.map((internship) => (
              <tr
                key={internship._id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium">{internship.title}</td>

                <td className="px-6 py-5">{internship.category}</td>

                <td className="px-6 py-5">{internship.workMode}</td>

                <td className="px-6 py-5">
                  ₹{internship.stipend.toLocaleString()}
                </td>

                <td className="px-6 py-5">{internship.applicantsCount}</td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      internship.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {internship.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      to={`/recruiter/internships/${internship._id}/applications`}
                      className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50"
                      title="View Applications"
                    >
                      <Users size={18} />
                    </Link>

                    <Link
                      to={`/recruiter/internships/edit/${internship._id}`}
                      className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() => onDelete(internship._id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternshipTable;
