import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import { toggleCommunityPostLike } from "../../services/community.service";

const CommunityPostCard = ({ post, onEdit, onDelete, onComments }) => {
  const { user } = useAuth();

  const [liked, setLiked] = useState(
    post.likes?.some((like) => like === user?._id || like?._id === user?._id) ||
      false,
  );

  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const [liking, setLiking] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const isOwner = post.author?._id === user?._id;

  const handleLike = async () => {
    if (liking) return;

    try {
      setLiking(true);

      const response = await toggleCommunityPostLike(post._id);

      setLiked(response.liked);
      setLikesCount(response.likesCount);
    } catch (error) {
      console.error("Failed to update like:", error);
    } finally {
      setLiking(false);
    }
  };

  const authorName = post.author?.fullName || "Student";

  const authorInitial = authorName.charAt(0).toUpperCase();

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <article className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-md">
      {/* ================= Header ================= */}

      <div className="flex items-start justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          {/* Avatar */}

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {authorInitial}
          </div>

          {/* Author Information */}

          <div>
            <p className="font-semibold leading-5 text-slate-900">
              {authorName}
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span>{formattedDate}</span>

              <span className="text-slate-300">•</span>

              <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-indigo-600">
                {post.category}
              </span>
            </div>
          </div>
        </div>

        {/* ================= Owner Menu ================= */}

        {isOwner && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Post options"
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-30 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.(post);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(post);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= Post Content ================= */}

      <div className="px-6 pb-5">
        <h2 className="text-left text-xl font-bold leading-7 text-slate-900">
          {post.title}
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-left text-[15px] leading-7 text-slate-600">
          {post.content}
        </p>
      </div>

      {/* ================= Actions ================= */}

      <div className="flex items-center border-t border-slate-100 px-6 py-3.5">
        <button
          type="button"
          onClick={handleLike}
          disabled={liking}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
            liked
              ? "bg-red-50 text-red-600"
              : "text-slate-500 hover:bg-slate-50 hover:text-red-600"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />

          <span>{likesCount}</span>

          <span>Likes</span>
        </button>

        <button
          type="button"
          onClick={() => onComments?.(post)}
          className="ml-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
        >
          <MessageCircle size={18} />

          <span>{post.commentsCount || 0}</span>

          <span>Comments</span>
        </button>
      </div>
    </article>
  );
};

export default CommunityPostCard;
