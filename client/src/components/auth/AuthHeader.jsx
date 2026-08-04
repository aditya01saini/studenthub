const AuthHeader = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-8 text-center">

      <h2 className="text-4xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 text-slate-600 leading-7">
        {subtitle}
      </p>

    </div>
  );
};

export default AuthHeader;