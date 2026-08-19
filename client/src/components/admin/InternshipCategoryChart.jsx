import { motion } from "framer-motion";
import { Layers3 } from "lucide-react";

const InternshipCategoryChart = ({ data = [] }) => {
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const maxValue = Math.max(...sortedData.map((item) => item.count || 0), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: 0.08,
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Layers3 size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Internship Categories
            </h3>

            <p className="text-[11px] text-slate-400">
              Distribution by category
            </p>
          </div>
        </div>

        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
          {data.length} Categories
        </span>
      </div>

      {sortedData.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center">
          <p className="text-sm text-slate-400">No category data available.</p>
        </div>
      ) : (
        <div className="mt-7 space-y-5">
          {sortedData.map((item, index) => {
            const percentage = ((item.count || 0) / maxValue) * 100;

            return (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.07,
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="truncate text-xs font-semibold text-slate-600">
                    {item._id}
                  </span>

                  <span className="shrink-0 text-xs font-bold text-slate-900">
                    {item.count}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.07,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default InternshipCategoryChart;
