import { Link } from "react-router-dom";

const AuthFooter = ({
  text,
  linkText,
  to,
}) => {
  return (
    <div className="mt-8 text-center text-sm text-slate-600">
      <span>{text} </span>

      <Link
        to={to}
        className="font-semibold text-indigo-600 transition hover:text-indigo-700"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;