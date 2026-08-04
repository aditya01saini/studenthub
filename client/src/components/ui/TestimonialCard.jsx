import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = ({
  name,
  role,
  college,
  review,
  rating,
}) => {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

      {/* Quote Icon */}

      <div className="mb-6 flex justify-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 transition-all duration-300 group-hover:bg-indigo-600">

          <FaQuoteLeft className="text-xl text-indigo-600 transition-all duration-300 group-hover:text-white" />

        </div>

      </div>

      {/* Rating */}

      <div className="mb-5 flex justify-center gap-1">

        {[...Array(rating)].map((_, index) => (
          <FaStar
            key={index}
            className="text-yellow-400"
          />
        ))}

      </div>

      {/* Review */}

      <p className="text-center italic leading-7 text-slate-600">
        "{review}"
      </p>

      {/* Divider */}

      <div className="my-6 border-t border-slate-200"></div>

      {/* User */}

      <div className="flex flex-col items-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
          {name.charAt(0)}
        </div>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          {name}
        </h3>

        <p className="mt-1 font-medium text-indigo-600">
          {role}
        </p>

        <p className="mt-1 text-slate-500">
          {college}
        </p>

      </div>

    </div>
  );
};

export default TestimonialCard;