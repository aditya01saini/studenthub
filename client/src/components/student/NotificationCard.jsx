import { FaBell, FaCheckCircle } from "react-icons/fa";

const NotificationCard = ({ notification, onMarkRead, getRelativeDate }) => {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
        notification.isRead
          ? "border-slate-200 bg-white"
          : "border-indigo-300 bg-indigo-50"
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        {/* Left */}

        <div className="flex gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              notification.isRead ? "bg-slate-100" : "bg-indigo-100"
            }`}
          >
            <FaBell
              className={`text-xl ${
                notification.isRead ? "text-slate-500" : "text-indigo-600"
              }`}
            />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {notification.title}
            </h3>

            <p className="mt-2 text-slate-600">{notification.message}</p>

            {notification.sender && (
              <p className="mt-2 text-sm text-slate-500">
                By {notification.sender.fullName}
              </p>
            )}

            <p className="mt-2 text-sm text-slate-400">
              {getRelativeDate(notification.createdAt)}
            </p>
          </div>
        </div>

        {/* Right */}

        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification._id)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <FaCheckCircle />
            Mark Read
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
