import { motion } from "framer-motion";
import { PieChart } from "lucide-react";

const statusConfig = {
  Accepted: {
    label: "Accepted",
    className: "bg-emerald-500",
  },
  Shortlisted: {
    label: "Shortlisted",
    className: "bg-indigo-500",
  },
  Pending: {
    label: "Pending",
    className: "bg-amber-500",
  },
  Rejected: {
    label: "Rejected",
    className: "bg-red-500",
  },
  Withdrawn: {
    label: "Withdrawn",
    className: "bg-slate-400",
  },
};

const ApplicationStatusChart = ({ data = [] }) => {
  const total = data.reduce((sum, item) => sum + (item.count || 0), 0);

  let currentAngle = 0;

  const segments = data.map((item) => {
    const percentage = total > 0 ? (item.count / total) * 100 : 0;

    const start = currentAngle;

    currentAngle += percentage;

    return {
      ...item,
      percentage,
      start,
      end: currentAngle,
    };
  });

  const gradient = segments.length
    ? `conic-gradient(${segments
        .map((segment) => {
          const color =
            segment._id === "Accepted"
              ? "#10b981"
              : segment._id === "Shortlisted"
                ? "#6366f1"
                : segment._id === "Pending"
                  ? "#f59e0b"
                  : segment._id === "Rejected"
                    ? "#ef4444"
                    : "#94a3b8";

          return `${color} ${segment.start}% ${segment.end}%`;
        })
        .join(", ")})`
    : "#f1f5f9";

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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <PieChart size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Application Status
            </h3>

            <p className="text-[11px] text-slate-400">
              Current application distribution
            </p>
          </div>
        </div>

        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
          {total} Total
        </span>
      </div>

      {total === 0 ? (
        <div className="flex h-[250px] items-center justify-center">
          <p className="text-sm text-slate-400">
            No application data available.
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-7 sm:flex-row sm:justify-between">
          {/* Donut */}
          <div className="relative">
            <motion.div
              initial={{
                scale: 0.85,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: gradient,
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-2xl font-bold text-slate-900">
                  {total}
                </span>

                <span className="text-[10px] font-medium text-slate-400">
                  Applications
                </span>
              </div>
            </motion.div>
          </div>

          {/* Legend */}
          <div className="w-full space-y-3 sm:w-auto sm:min-w-[150px]">
            {segments.map((item, index) => {
              const config = statusConfig[item._id] || {
                label: item._id,
                className: "bg-slate-400",
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
                    duration: 0.3,
                    delay: index * 0.06,
                  }}
                  className="flex items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${config.className}`}
                    />

                    <span className="text-xs font-medium text-slate-600">
                      {config.label}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900">
                      {item.count}
                    </span>

                    <span className="ml-1 text-[10px] text-slate-400">
                      ({item.percentage.toFixed(0)}%)
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ApplicationStatusChart;
