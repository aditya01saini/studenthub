import {
  Bell,
  Briefcase,
  CheckCircle2,
  UserPlus,
  XCircle,
  Clock3,
} from "lucide-react";

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "APPLICATION_SUBMITTED":
        return {
          icon: <UserPlus size={22} />,
          bg: "bg-blue-100",
          color: "text-blue-600",
        };

      case "APPLICATION_ACCEPTED":
        return {
          icon: <CheckCircle2 size={22} />,
          bg: "bg-green-100",
          color: "text-green-600",
        };

      case "APPLICATION_REJECTED":
        return {
          icon: <XCircle size={22} />,
          bg: "bg-red-100",
          color: "text-red-600",
        };

      case "INTERNSHIP_CREATED":
        return {
          icon: <Briefcase size={22} />,
          bg: "bg-indigo-100",
          color: "text-indigo-600",
        };

      default:
        return {
          icon: <Bell size={22} />,
          bg: "bg-slate-100",
          color: "text-slate-600",
        };
    }
  };

  const icon = getIcon();

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        notification.isRead
          ? "border-slate-200 bg-white"
          : "border-indigo-200 bg-indigo-50/60"
      }`}
    >
      <div className="flex items-start gap-5 p-6">
        {/* Icon */}

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${icon.bg}`}
        >
          <div className={icon.color}>{icon.icon}</div>
        </div>

        {/* Content */}

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {notification.title}
                </h3>

                {!notification.isRead && (
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
                )}
              </div>

              <p className="mt-2 leading-7 text-slate-600">
                {notification.message}
              </p>
            </div>

            {!notification.isRead && (
              <button
                onClick={() => onMarkAsRead(notification._id)}
                className="rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
              >
                Mark Read
              </button>
            )}
          </div>

          {/* Footer */}

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock3 size={16} />

              <span>{new Date(notification.createdAt).toLocaleString()}</span>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                notification.isRead
                  ? "bg-slate-100 text-slate-600"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {notification.isRead ? "Read" : "Unread"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
