import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Button from "./Button";

const StudentCard = ({
  id,
  name,
  role,
  college,
  badge,
  projects = 0,
  followers = 0,
  skills = [],
  profileImage = "",
  github = "",
  linkedin = "",
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (!id) {
      console.error("Student ID is missing");
      return;
    }

    navigate(`/students/${id}`);
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
      {/* Badge */}

      <div className="flex justify-center">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {badge || "Top Contributor"}
        </span>
      </div>

      {/* Avatar */}

      <div className="mt-4 flex justify-center">
        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className="h-20 w-20 rounded-full object-cover ring-4 ring-indigo-50 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 transition-all duration-300 group-hover:bg-indigo-600">
            <FaCode className="text-3xl text-indigo-600 transition-colors duration-300 group-hover:text-white" />
          </div>
        )}
      </div>

      {/* Name */}

      <h3 className="mt-4 truncate text-center text-xl font-bold text-slate-900">
        {name || "Student"}
      </h3>

      {/* Role */}

      <p className="mt-1 text-center text-sm font-semibold text-indigo-600">
        {role || "Student"}
      </p>

      {/* College */}

      <p className="mt-1 truncate text-center text-sm text-slate-500">
        {college || "College not specified"}
      </p>

      {/* Skills */}

      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}

          {skills.length > 4 && (
            <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-400">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Stats */}

      <div className="mx-auto mt-5 flex max-w-[220px] justify-around border-y border-slate-100 py-3">
        <div className="text-center">
          <h4 className="text-lg font-bold text-slate-900">{projects}</h4>

          <p className="text-xs text-slate-500">Projects</p>
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <div className="text-center">
          <h4 className="text-lg font-bold text-slate-900">{followers}</h4>

          <p className="text-xs text-slate-500">Followers</p>
        </div>
      </div>

      {/* Social Links */}

      <div className="mt-4 flex min-h-[34px] justify-center gap-3">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        )}

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        )}

        {!github && !linkedin && (
          <span className="text-xs text-slate-400">No social links</span>
        )}
      </div>

      {/* View Profile */}

      <div className="mt-4 flex justify-center">
        <Button
          type="button"
          onClick={handleViewProfile}
          className="px-5 py-2 text-sm"
        >
          View Profile →
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
