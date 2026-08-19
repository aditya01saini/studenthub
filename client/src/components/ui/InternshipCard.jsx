import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Button from "./Button";

const InternshipCard = ({
  id,
  badge,
  company,
  role,
  location,
  stipend,
  duration,
  mode,
}) => {
  const navigate = useNavigate();

  const handleViewInternship = () => {
    if (!id) {
      console.error("Internship ID is missing");
      return;
    }

    navigate(`/internships/${id}`);
  };

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-2xl font-bold text-slate-900">
            {company}
          </h3>

          <p className="mt-2 font-semibold text-indigo-600">{role}</p>
        </div>

        {badge && (
          <span className="shrink-0 rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
            {badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-slate-600">
          <FaMapMarkerAlt className="text-indigo-600" />
          <span>{location || "Location not specified"}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaMoneyBillWave className="text-green-600" />
          <span>{stipend || "Not specified"}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaClock className="text-orange-500" />
          <span>{duration || "Not specified"}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaBriefcase className="text-purple-600" />
          <span>{mode || "Not specified"}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-slate-200" />

      {/* Button */}
      <Button
        type="button"
        onClick={handleViewInternship}
        className="w-full justify-center"
      >
        Apply Now
        <FaArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default InternshipCard;
