import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApplicants } from "../../services/application.service";

const Applicants = () => {
  const { internshipId } = useParams();

  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState(null);
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const response = await getApplicants(internshipId);

      setInternship(response.internship);
      setApplications(response.applications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [internshipId]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Loading applicants...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Applicants
        </h1>

        <p className="mt-2 text-slate-500">
          {internship?.title}
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-lg font-medium">
          Total Applicants:
          <span className="ml-2 font-bold text-indigo-600">
            {applications.length}
          </span>
        </p>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-slate-500">
          Applicants table will be added in the next step.
        </p>
      </div>
    </div>
  );
};

export default Applicants;