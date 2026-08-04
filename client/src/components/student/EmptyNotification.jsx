import { FaBellSlash } from "react-icons/fa";

const EmptyNotification = () => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <FaBellSlash className="text-3xl text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        No Notifications
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        You're all caught up. Any new recruiter updates, application responses,
        or system notifications will appear here.
      </p>
    </div>
  );
};

export default EmptyNotification;
