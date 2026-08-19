import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";

const modeStyles = {
  Remote: {
    color: "#6366f1",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
  },

  Onsite: {
    color: "#10b981",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },

  Hybrid: {
    color: "#f59e0b",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
};

const InternshipWorkModeChart = ({ data = [] }) => {
  const total = data.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: 0.12,
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <MapPinned size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Work Modes</h3>

            <p className="text-[11px] text-slate-400">
              Internship work preferences
            </p>
          </div>
        </div>

        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
          {total} Total
        </span>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center">
          <p className="text-sm text-slate-400">No work mode data available.</p>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          {data.map((item, index) => {
            const percentage =
              total > 0 ? ((item.count || 0) / total) * 100 : 0;

            const style = modeStyles[item._id] || {
              color: "#64748b",
              bg: "bg-slate-50",
              text: "text-slate-600",
            };

            return (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.bg} ${style.text}`}
                    >
                      <MapPinned size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {item._id}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {percentage.toFixed(1)}% of internships
                      </p>
                    </div>
                  </div>

                  <span className="text-lg font-bold text-slate-900">
                    {item.count}
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: style.color,
                    }}
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

export default InternshipWorkModeChart;
