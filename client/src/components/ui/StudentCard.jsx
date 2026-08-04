import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import Button from "./Button";

const StudentCard = ({
  name,
  role,
  college,
  badge,
  projects,
  followers,
  skills,
}) => {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

      {/* Badge */}

      <div className="flex justify-center">
        <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
          {badge}
        </span>
      </div>

      {/* Avatar */}

      <div className="mt-6 flex justify-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600">

          <FaCode className="text-4xl text-indigo-600 transition-all duration-300 group-hover:text-white" />

        </div>

      </div>

      {/* Name */}

      <h3 className="mt-6 text-center text-2xl font-bold text-slate-900">
        {name}
      </h3>

      {/* Role */}

      <p className="mt-2 text-center font-semibold text-indigo-600">
        {role}
      </p>

      {/* College */}

      <p className="mt-2 text-center text-slate-500">
        {college}
      </p>

      {/* Skills */}

      <div className="mt-6 flex flex-wrap justify-center gap-2">

        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
          >
            {skill}
          </span>
        ))}

      </div>

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

        <button className="rounded-full bg-slate-100 p-3 text-xl text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white">
          <FaGithub />
        </button>

        <button className="rounded-full bg-slate-100 p-3 text-xl text-slate-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white">
          <FaLinkedin />
        </button>

      </div>

      {/* Button */}

      <div className="mt-8 flex justify-center">
        <Button>
          View Profile →
        </Button>
      </div>

    </div>
  );
};

export default StudentCard;