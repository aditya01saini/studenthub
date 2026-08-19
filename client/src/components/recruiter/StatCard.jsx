import Card from "../ui/Card";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "indigo",
}) => {
  const colors = {
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        {Icon && (
          <div
            className={`rounded-2xl p-4 ${colors[color].bg}`}
          >
            <Icon
              size={28}
              className={colors[color].text}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;