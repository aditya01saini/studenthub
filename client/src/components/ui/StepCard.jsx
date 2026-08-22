const StepCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group w-full rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:p-6">
      {/* Icon */}

      <div className="mb-4 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-600">
          <Icon className="text-xl text-indigo-600 transition-colors duration-300 group-hover:text-white" />
        </div>
      </div>

      {/* Title */}

      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>

      {/* Description */}

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
