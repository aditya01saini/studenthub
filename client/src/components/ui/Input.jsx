const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error = "",
}) => {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300
        ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
        }
        ${
          disabled
            ? "cursor-not-allowed bg-slate-100"
            : ""
        }`}
      />

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;