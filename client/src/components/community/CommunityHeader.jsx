import { PlusCircle, Users } from "lucide-react";

const CommunityHeader = ({ onCreatePost }) => {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Users size={26} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-200">
              StudentHub Community
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Learn. Share. Grow.
          </h1>

          <p className="mt-3 max-w-2xl text-indigo-100">
            Connect with students, share your ideas, ask questions,
            discuss projects and learn from the StudentHub community.
          </p>
        </div>

        <button
          onClick={onCreatePost}
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
        >
          <PlusCircle size={19} />
          Create Post
        </button>
      </div>
    </section>
  );
};

export default CommunityHeader;