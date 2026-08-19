import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const InternshipGrowthChart = ({ data = [] }) => {
  const chartData = [...data].sort((a, b) => {
    if (a._id.year !== b._id.year) {
      return a._id.year - b._id.year;
    }

    return a._id.month - b._id.month;
  });

  const values = chartData.map((item) => item.internships || 0);

  const maxValue = Math.max(...values, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <BriefcaseBusiness size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Internship Growth
            </h3>

            <p className="text-[11px] text-slate-400">
              Monthly internship postings
            </p>
          </div>
        </div>

        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
          Monthly
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center">
          <p className="text-sm text-slate-400">
            No internship growth data available.
          </p>
        </div>
      ) : (
        <div className="mt-7">
          <div className="flex h-[240px] items-end gap-3 border-b border-slate-100 px-2">
            {chartData.map((item, index) => {
              const value = item.internships || 0;

              const height =
                maxValue > 0 ? Math.max((value / maxValue) * 85, 5) : 5;

              return (
                <div
                  key={`${item._id.year}-${item._id.month}`}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: `${height}%`,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="group relative w-full max-w-[55px] rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-500 shadow-sm"
                  >
                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                      {value}
                    </div>
                  </motion.div>

                  <span className="mt-3 text-[10px] font-medium text-slate-400">
                    {monthNames[item._id.month - 1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InternshipGrowthChart;
