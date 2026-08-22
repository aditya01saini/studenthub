const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>

      <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;
