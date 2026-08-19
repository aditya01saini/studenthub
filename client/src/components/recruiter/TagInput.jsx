import { useState } from "react";
import { X } from "lucide-react";

const TagInput = ({ label, placeholder, tags, setTags }) => {
  const [input, setInput] = useState("");

  const addTag = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = input.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setInput("");
      return;
    }

    setTags([...tags, value]);
    setInput("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="rounded-xl border border-slate-300 p-3 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100">
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
            >
              {tag}

              <button type="button" onClick={() => removeTag(tag)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
          className="w-full outline-none"
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">Press Enter to add.</p>
    </div>
  );
};

export default TagInput;
