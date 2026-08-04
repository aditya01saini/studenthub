const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105",

    secondary:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",

    outline:
      "border border-slate-300 text-slate-700 hover:border-indigo-600 hover:text-indigo-600",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;