const StepCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="group w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

      {/* Icon */}

      <div className="mb-6 flex justify-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600">

          <Icon className="text-3xl text-indigo-600 transition-all duration-300 group-hover:text-white" />

        </div>

      </div>

      {/* Title */}

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  );
};

export default StepCard;