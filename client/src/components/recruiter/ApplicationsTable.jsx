import { CheckCircle, Star, XCircle } from "lucide-react";

import ResumeButton from "./ResumeButton";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
const ApplicationsTable = ({
  applications = [],
  onStatusChange,
  onViewApplication,
}) => {
  if (!applications.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <h3 className="text-xl font-semibold text-slate-800">
          No Applications Found
        </h3>

        <p className="mt-2 text-slate-500">No students have applied yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Student
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                Internship
              </th>

              <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Resume
              </th>

              <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Applied
              </th>

              <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                {/* Student */}

                <td className="px-5 py-4">
                  <div
                    onClick={() => onViewApplication(application)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <img
                      src={
                        application.student?.profileImage ||
                        `https://ui-avatars.com/api/?name=${
                          application.student?.user?.fullName || "Student"
                        }`
                      }
                      alt="student"
                      className="h-10 w-10 rounded-full border object-cover"
                    />

                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 hover:text-indigo-600">
                        {application.student?.user?.fullName}
                      </h4>

                      <p className="text-xs text-slate-500">
                        {application.student?.user?.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Internship */}

                <td className="px-5 py-4">
                  <h4 className="text-sm font-semibold text-slate-800">
                    {application.internship?.title}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {application.internship?.category}
                  </p>
                </td>

                {/* Resume */}

                <td className="px-5 py-4 text-center">
                  <ResumeButton url={application.resumeUrl} />
                </td>

                {/* Status */}

                <td className="px-5 py-4 text-center">
                  <ApplicationStatusBadge status={application.status} />
                </td>

                {/* Date */}

                <td className="px-5 py-4 text-center text-sm text-slate-600">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </td>

                {/* Actions */}

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() =>
                        onStatusChange(application._id, "Shortlisted")
                      }
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                      title="Shortlist"
                    >
                      <Star size={17} />
                    </button>

                    <button
                      onClick={() =>
                        onStatusChange(application._id, "Accepted")
                      }
                      className="rounded-lg p-2 text-green-600 transition hover:bg-green-100"
                      title="Accept"
                    >
                      <CheckCircle size={17} />
                    </button>

                    <button
                      onClick={() =>
                        onStatusChange(application._id, "Rejected")
                      }
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                      title="Reject"
                    >
                      <XCircle size={17} />
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

export default ApplicationsTable;
