import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

import Button from "./Button";

const InternshipCard = ({
  badge,
  company,
  role,
  location,
  stipend,
  duration,
  mode,
}) => {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">


      <div className="mb-6 flex items-center justify-between">

        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            {company}
          </h3>

          <p className="mt-2 font-semibold text-indigo-600">
            {role}
          </p>
        </div>

        <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
          {badge}
        </span>

      </div>


      <div className="space-y-4">

        <div className="flex items-center gap-3 text-slate-600">
          <FaMapMarkerAlt className="text-indigo-600" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaMoneyBillWave className="text-green-600" />
          <span>{stipend}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaClock className="text-orange-500" />
          <span>{duration}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <FaBriefcase className="text-purple-600" />
          <span>{mode}</span>
        </div>

      </div>


      <div className="my-6 border-t border-slate-200"></div>


      <Button className="w-full justify-center">
        Apply Now
        <FaArrowRight className="ml-2"/>
      </Button>

    </div>
  );
};

export default InternshipCard;