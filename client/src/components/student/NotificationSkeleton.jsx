const NotificationSkeleton = () => {
  return (
    <div className="space-y-5">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-200"></div>

            <div className="flex-1">
              <div className="h-5 w-48 rounded bg-slate-200"></div>

              <div className="mt-3 h-4 w-full rounded bg-slate-200"></div>

              <div className="mt-2 h-4 w-3/4 rounded bg-slate-200"></div>

              <div className="mt-4 h-3 w-32 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
