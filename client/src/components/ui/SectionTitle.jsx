const SectionTitle = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`mb-16 text-center ${className}`}>
      <h2 className="text-4xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;