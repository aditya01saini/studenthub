import {
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaEye,
} from "react-icons/fa";

import Button from "./Button";

const colors = {
  React: "bg-blue-100 text-blue-700",
  "Node.js": "bg-green-100 text-green-700",
  MongoDB: "bg-emerald-100 text-emerald-700",
  Express: "bg-gray-200 text-gray-700",
  Tailwind: "bg-cyan-100 text-cyan-700",
  "Tailwind CSS": "bg-cyan-100 text-cyan-700",
  API: "bg-orange-100 text-orange-700",
  JWT: "bg-purple-100 text-purple-700",
  MERN: "bg-pink-100 text-pink-700",
};

const ProjectCard = ({
  badge,
  title,
  tech,
  description,
}) => {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

      {/* Badge */}

      <div className="mb-6 flex justify-between items-center">

        <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
          {badge}
        </span>

        <div className="h-2 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>

      </div>

      {/* Title */}

      <h3 className="text-2xl font-bold leading-snug text-slate-900">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-5 flex-1 leading-7 text-slate-600">
        {description}
      </p>

      {/* Tech */}

      <div className="mt-6 flex flex-wrap gap-2">

        {tech.map((item) => (
          <span
            key={item}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              colors[item] || "bg-slate-100 text-slate-700"
            }`}
          >
            {item}
          </span>
        ))}

      </div>

      {/* Divider */}

      <div className="my-6 border-t border-slate-200"></div>

      {/* Stats */}

      <div className="flex items-center justify-between text-sm">

        <div className="flex items-center gap-2 text-yellow-500">
          <FaStar />
          <span className="font-medium text-slate-700">
            4.9 Rating
          </span>
        </div>

        <div className="flex items-center gap-2 text-indigo-600">
          <FaEye />
          <span className="font-medium text-slate-700">
            2.3K Views
          </span>
        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <Button>
          <FaGithub className="mr-2"/>
          GitHub
        </Button>

        <Button variant="secondary">
          <FaExternalLinkAlt className="mr-2"/>
          Live Demo
        </Button>

      </div>

    </div>
  );
};

export default ProjectCard;