const Badge = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;