import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-lg font-semibold text-slate-900">
          {question}
        </h3>

        {open ? (
          <FaMinus className="text-indigo-600" />
        ) : (
          <FaPlus className="text-indigo-600" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-200 px-6 pb-6 pt-4">
          <p className="leading-7 text-slate-600">
            {answer}
          </p>
        </div>
      )}

    </div>
  );
};

export default FAQItem;