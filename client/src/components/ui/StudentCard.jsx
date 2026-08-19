import {
  FaGithub,
  FaLinkedin,
  FaCode,
} from "react-icons/fa";

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
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

      {/* Badge */}

      <div className="flex justify-center">
        <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
          {badge || "Top Contributor"}
        </span>
      </div>

      {/* Avatar */}

      <div className="mt-6 flex justify-center">

        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-50 transition-all duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600">
            <FaCode className="text-4xl text-indigo-600 transition-all duration-300 group-hover:text-white" />
          </div>
        )}

      </div>

      {/* Name */}

      <h3 className="mt-6 text-center text-2xl font-bold text-slate-900">
        {name || "Student"}
      </h3>

      {/* Role */}

      <p className="mt-2 text-center font-semibold text-indigo-600">
        {role || "Student"}
      </p>

      {/* College */}

      <p className="mt-2 text-center text-slate-500">
        {college || "College not specified"}
      </p>

      {/* Skills */}

      {skills.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">

          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}

        </div>
      )}

      {/* Stats */}

      <div className="mt-8 flex justify-center gap-10">

        <div className="text-center">
          <h4 className="text-xl font-bold text-slate-900">
            {projects}
          </h4>

          <p className="text-sm text-slate-500">
            Projects
          </p>
        </div>

        <div className="text-center">
          <h4 className="text-xl font-bold text-slate-900">
            {followers}
          </h4>

          <p className="text-sm text-slate-500">
            Followers
          </p>
        </div>

      </div>

      {/* Social */}

      <div className="mt-8 flex justify-center gap-4">

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="rounded-full bg-slate-100 p-3 text-xl text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
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
            className="rounded-full bg-slate-100 p-3 text-xl text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
          >
            <FaLinkedin />
          </a>
        )}

        {!github && !linkedin && (
          <div className="text-sm text-slate-400">
            No social links
          </div>
        )}

      </div>

      {/* View Profile */}

      <div className="mt-8 flex justify-center">

        <Button
          type="button"
          onClick={handleViewProfile}
        >
          View Profile →
        </Button>

      </div>

    </div>
  );
};

export default StudentCard;