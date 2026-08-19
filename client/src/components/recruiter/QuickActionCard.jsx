import { Link } from "react-router-dom";
import Card from "../ui/Card";

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  to,
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
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  };

  return (
    <Link to={to}>
      <Card className="cursor-pointer p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className={`mb-5 inline-flex rounded-2xl p-4 ${colors[color].bg}`}>
          {Icon && <Icon size={28} className={colors[color].text} />}
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </Card>
    </Link>
  );
};

export default QuickActionCard;
