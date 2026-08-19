import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications = [], onMarkAsRead }) => {
  if (!notifications.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-5xl">
          🔔
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          You're all caught up!
        </h2>

        <p className="mt-3 text-slate-500">No new notifications available.</p>
      </div>
    );
  }

  const today = [];
  const yesterday = [];
  const older = [];

  const isToday = (date) => {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterdayDate = new Date();

    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    return (
      date.getDate() === yesterdayDate.getDate() &&
      date.getMonth() === yesterdayDate.getMonth() &&
      date.getFullYear() === yesterdayDate.getFullYear()
    );
  };

  notifications.forEach((notification) => {
    const date = new Date(notification.createdAt);

    if (isToday(date)) {
      today.push(notification);
    } else if (isYesterday(date)) {
      yesterday.push(notification);
    } else {
      older.push(notification);
    }
  });

  const Section = ({ title, items }) =>
    items.length > 0 && (
      <div className="space-y-5">
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
          <div className="h-3 w-3 rounded-full bg-indigo-600"></div>

          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        </div>

        {items.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-10">
      <Section title="Today" items={today} />

      <Section title="Yesterday" items={yesterday} />

      <Section title="Earlier" items={older} />
    </div>
  );
};

export default NotificationList;
