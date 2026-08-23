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
    <div
      className="
        group flex h-full w-full min-w-0 max-w-full flex-col
        overflow-hidden rounded-3xl
        border border-slate-200 bg-white
        p-6 sm:p-8
        shadow-md
        transition-all duration-300
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div
        className="
          mb-6 flex min-w-0 flex-col gap-3
          sm:flex-row sm:items-start sm:justify-between
        "
      >
        {/* Company + Role */}
        <div className="min-w-0 flex-1">
          <h3
            className="
              break-words text-xl font-bold text-slate-900
              sm:text-2xl
            "
          >
            {company}
          </h3>

          <p className="mt-2 break-words font-semibold text-indigo-600">
            {role}
          </p>
        </div>

        {/* Badge */}
        {badge && (
          <span
            className="
              w-fit max-w-full shrink-0
              rounded-full
              bg-indigo-100
              px-4 py-1.5
              text-sm font-semibold
              text-indigo-600
            "
          >
            {badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="min-w-0 space-y-4">
        {/* Location */}
        <div className="flex min-w-0 items-start gap-3 text-slate-600">
          <FaMapMarkerAlt className="mt-1 shrink-0 text-indigo-600" />

          <span className="min-w-0 break-words">
            {location || "Location not specified"}
          </span>
        </div>

        {/* Stipend */}
        <div className="flex min-w-0 items-start gap-3 text-slate-600">
          <FaMoneyBillWave className="mt-1 shrink-0 text-green-600" />

          <span className="min-w-0 break-words">
            {stipend || "Not specified"}
          </span>
        </div>

        {/* Duration */}
        <div className="flex min-w-0 items-start gap-3 text-slate-600">
          <FaClock className="mt-1 shrink-0 text-orange-500" />

          <span className="min-w-0 break-words">
            {duration || "Not specified"}
          </span>
        </div>

        {/* Mode */}
        <div className="flex min-w-0 items-start gap-3 text-slate-600">
          <FaBriefcase className="mt-1 shrink-0 text-purple-600" />

          <span className="min-w-0 break-words">{mode || "Not specified"}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 w-full border-t border-slate-200" />

      {/* Button */}
      <div className="w-full min-w-0">
        <Button
          type="button"
          onClick={handleViewInternship}
          className="w-full min-w-0 justify-center"
        >
          <span>Apply Now</span>

          <FaArrowRight className="ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;
