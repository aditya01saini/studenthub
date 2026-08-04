import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="relative">

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition-all duration-300
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-indigo-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;