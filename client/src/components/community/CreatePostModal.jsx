import { useState } from "react";
import { X, Send } from "lucide-react";

import { createCommunityPost } from "../../services/community.service";

const categories = [
  "General",
  "Career",
  "Internship",
  "Projects",
  "Technology",
  "Study",
  "Interview",
];

const CreatePostModal = ({
  open,
  onClose,
  onPostCreated,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a post title.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter your post content.");
      return;
    }

    try {
      setLoading(true);

      const response = await createCommunityPost({
        title: title.trim(),
        content: content.trim(),
        category,
      });

      onPostCreated(response.post);

      setTitle("");
      setContent("");
      setCategory("General");

      onClose();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create post. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create Community Post
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Share something useful with the StudentHub community.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={21} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              placeholder="What do you want to discuss?"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {title.length}/150
            </p>
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Content
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={5000}
              rows={7}
              placeholder="Share your question, idea, experience or knowledge..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {content.length}/5000
            </p>
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={17} />

              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;