import { useEffect, useState } from "react";

import CommunityHeader from "../../components/community/CommunityHeader";
import CreatePostModal from "../../components/community/CreatePostModal";

import {
  getCommunityPosts,
} from "../../services/community.service";

const Community = () => {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const data = await getCommunityPosts({
        page,
        limit: 10,
      });

      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(
        "Failed to fetch community posts:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);

    setCreateModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* ================= Header ================= */}

      <CommunityHeader
        onCreatePost={() => setCreateModalOpen(true)}
      />

      {/* ================= Community Feed ================= */}

      <section>
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
            Loading community posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              No posts yet
            </h2>

            <p className="mt-2 text-slate-500">
              Be the first student to start a discussion.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <div
                key={post._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {/* Author */}

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                    {post.author?.fullName
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {post.author?.fullName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {post.category}
                    </p>
                  </div>
                </div>

                {/* Title */}

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {post.title}
                </h2>

                {/* Content */}

                <p className="mt-3 leading-7 text-slate-600">
                  {post.content}
                </p>

                {/* Stats */}

                <div className="mt-5 flex gap-5 text-sm text-slate-500">
                  <span>
                    ❤️ {post.likes?.length || 0} Likes
                  </span>

                  <span>
                    💬 {post.commentsCount || 0} Comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= Pagination ================= */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage((prev) => prev - 1)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((prev) => prev + 1)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* ================= Create Post Modal ================= */}

      <CreatePostModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Community;