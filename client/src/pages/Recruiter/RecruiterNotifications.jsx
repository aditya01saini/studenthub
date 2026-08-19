import { useEffect, useMemo, useState } from "react";
import { Bell, BellRing, CheckCheck, Search } from "lucide-react";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notification.service";

import NotificationList from "../../components/recruiter/NotificationList";
import Pagination from "../../components/recruiter/Pagination";

const RecruiterNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [unreadCount, setUnreadCount] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications(page, 10);

      setNotifications(data.notifications);

      setTotalPages(data.totalPages);

      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllNotificationsRead();

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotifications = useMemo(() => {
    let data = [...notifications];

    if (filter === "unread") {
      data = data.filter((item) => !item.isRead);
    }

    if (filter === "read") {
      data = data.filter((item) => item.isRead);
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(value) ||
          item.message.toLowerCase().includes(value),
      );
    }

    return data;
  }, [notifications, search, filter]);

  const todayCount = notifications.filter((n) => {
    const d = new Date(n.createdAt);
    const t = new Date();

    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  }).length;

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <BellRing size={36} />

              <h1 className="text-4xl font-bold">Notifications</h1>
            </div>

            <p className="mt-4 max-w-2xl text-indigo-100">
              Stay updated with applications, internships and every important
              activity happening on StudentHub.
            </p>
          </div>

          <button
            onClick={handleMarkAll}
            disabled={!unreadCount}
            className="rounded-2xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center gap-2">
              <CheckCheck size={18} />
              Mark All Read
            </div>
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total</p>

          <h2 className="mt-2 text-3xl font-bold">{notifications.length}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Unread</p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            {unreadCount}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Today</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {todayCount}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Read</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-700">
            {notifications.length - unreadCount}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {["all", "unread", "read"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* List */}

      {loading ? (
        <div className="rounded-2xl bg-white py-24 text-center text-slate-500">
          Loading notifications...
        </div>
      ) : (
        <NotificationList
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkRead}
        />
      )}

      {/* Pagination */}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default RecruiterNotifications;
