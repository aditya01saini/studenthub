import Card from "../ui/Card";
import Badge from "../ui/Badge";

const CompanyStatsCard = ({
  isVerifiedCompany,
  activeInternshipsCount,
  totalHires,
}) => {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Company Statistics
        </h2>

        <p className="mt-2 text-slate-500">
          Overview of your company profile and hiring performance.
        </p>
      </div>

      <div className="space-y-6">
        {/* Verified */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
          <div>
            <h3 className="font-semibold text-slate-800">
              Verification Status
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Company verification managed by StudentHub.
            </p>
          </div>

          <Badge
            className={
              isVerifiedCompany
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          >
            {isVerifiedCompany ? "Verified" : "Pending"}
          </Badge>
        </div>

        {/* Active Internships */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
          <div>
            <h3 className="font-semibold text-slate-800">Active Internships</h3>

            <p className="mt-1 text-sm text-slate-500">
              Currently published internships.
            </p>
          </div>

          <span className="text-3xl font-bold text-indigo-600">
            {activeInternshipsCount}
          </span>
        </div>

        {/* Total Hires */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
          <div>
            <h3 className="font-semibold text-slate-800">Total Hires</h3>

            <p className="mt-1 text-sm text-slate-500">
              Students hired through StudentHub.
            </p>
          </div>

          <span className="text-3xl font-bold text-green-600">
            {totalHires}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CompanyStatsCard;
