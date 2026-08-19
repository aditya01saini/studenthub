import { useEffect, useState } from "react";

import CommunityHeader from "../../components/community/CommunityHeader";

import { getCommunityPosts } from "../../services/community.service";
import CommunityPostCard from "../../components/community/CommunityPostCard";
const Community = () => {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

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
      console.error("Failed to fetch community posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <CommunityHeader
        onCreatePost={() => {
          console.log("Create post clicked");
        }}
      />

      {/* Feed */}

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
            import CommunityPostCard from
            "../../components/community/CommunityPostCard";
          </div>
        )}
      </section>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Community;
