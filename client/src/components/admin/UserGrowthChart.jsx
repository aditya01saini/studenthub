import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

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

const UserGrowthChart = ({ data = [] }) => {
  const chartData = [...data].sort((a, b) => {
    if (a._id.year !== b._id.year) {
      return a._id.year - b._id.year;
    }

    return a._id.month - b._id.month;
  });

  const values = chartData.map((item) => item.users || 0);

  const maxValue = Math.max(...values, 1);

  const points = chartData.map((item, index) => {
    const x =
      chartData.length === 1 ? 50 : (index / (chartData.length - 1)) * 100;

    const y = 100 - ((item.users || 0) / maxValue) * 75;

    return {
      x,
      y,
      value: item.users || 0,
      label: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    };
  });

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  const areaPoints = points.length > 0 ? `0,100 ${linePoints} 100,100` : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] sm:p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp size={18} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">User Growth</h3>

              <p className="text-[11px] text-slate-400">
                Monthly registrations
              </p>
            </div>
          </div>
        </div>

        <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">
          Monthly
        </span>
      </div>

      {/* Chart */}
      {chartData.length === 0 ? (
        <div className="flex h-[250px] items-center justify-center">
          <p className="text-sm text-slate-400">
            No user growth data available.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <div className="relative h-[250px]">
            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border-t border-dashed border-slate-100"
                />
              ))}
            </div>

            {/* SVG */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              {/* Area */}
              <polygon points={areaPoints} fill="rgba(79,70,229,0.06)" />

              {/* Line */}
              {points.length > 1 && (
                <polyline
                  points={linePoints}
                  fill="none"
                  stroke="rgb(79,70,229)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="animate-[drawLine_1s_ease-out_forwards]"
                />
              )}

              {/* Single point */}
              {points.map((point, index) => (
                <g key={`${point.label}-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill="white"
                    stroke="rgb(79,70,229)"
                    strokeWidth="1"
                  />

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="rgb(79,70,229)"
                    opacity="0.08"
                  />
                </g>
              ))}
            </svg>

            {/* Values */}
            <div className="absolute inset-x-0 bottom-0 top-0">
              {points.map((point, index) => (
                <div
                  key={`${point.label}-value-${index}`}
                  className="absolute -translate-x-1/2"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                  }}
                >
                  <div className="-translate-y-7 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg">
                    {point.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div className="mt-3 flex justify-between">
            {points.map((point, index) => (
              <span
                key={`${point.label}-label-${index}`}
                className="text-[10px] font-medium text-slate-400"
              >
                {point.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserGrowthChart;
