import { useEffect, useMemo, useState } from "react";

import { FaBell, FaSearch, FaCheckCircle } from "react-icons/fa";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notification.service";

const StudentNotifications = () => {
  // ===========================
  // States
  // ===========================

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 10;

  const [totalNotifications, setTotalNotifications] = useState(0);

  const [unreadCount, setUnreadCount] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  // ===========================
  // Fetch Notifications
  // ===========================

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true);

      setError("");

      const data = await getNotifications(page, notificationsPerPage);

      if (data.success) {
        setNotifications(data.notifications || []);

        setTotalNotifications(data.totalNotifications || 0);

        setUnreadCount(data.unreadCount || 0);

        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ===========================
  // Search
  // ===========================

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      return (
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.message.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [notifications, search]);

  // ===========================
  // Actions
  // ===========================

  const handleMarkRead = async (notificationId) => {
    try {
      const data = await markNotificationRead(notificationId);

      if (data.success) {
        fetchNotifications(currentPage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const data = await markAllNotificationsRead();

      if (data.success) {
        fetchNotifications(currentPage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===========================
  // Relative Date
  // ===========================

  const getRelativeDate = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);

    const diffInMs = now - notificationDate;

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";

    if (diffInDays === 1) return "Yesterday";

    if (diffInDays < 7) return `${diffInDays} days ago`;

    if (diffInDays < 30)
      return `${Math.floor(diffInDays / 7)} week${
        Math.floor(diffInDays / 7) > 1 ? "s" : ""
      } ago`;

    if (diffInDays < 365)
      return `${Math.floor(diffInDays / 30)} month${
        Math.floor(diffInDays / 30) > 1 ? "s" : ""
      } ago`;

    return `${Math.floor(diffInDays / 365)} year${
      Math.floor(diffInDays / 365) > 1 ? "s" : ""
    } ago`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Loading */}

      {loading && (
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      )}

      {!loading && (
        <>
          {/* Hero */}

          <section className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Notification Center
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              My Notifications
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Stay updated with internship application updates, recruiter
              responses and important announcements.
            </p>
          </section>

          {/* Statistics */}

          <section className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Notifications</p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {totalNotifications}
                  </h2>
                </div>

                <FaBell className="text-3xl text-indigo-600" />
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">Unread</p>

                  <h2 className="mt-2 text-3xl font-bold text-yellow-700">
                    {unreadCount}
                  </h2>
                </div>

                <FaCheckCircle className="text-3xl text-yellow-600" />
              </div>
            </div>
          </section>

          {/* Toolbar */}

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={handleMarkAllRead}
                className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                Mark All Read
              </button>
            </div>
          </section>

          {/* Header */}

          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Notifications
            </h2>

            <p className="text-sm text-slate-500">
              {filteredNotifications.length} Notification(s)
            </p>
          </div>

          {/* Error */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Empty State */}

          {!error && filteredNotifications.length === 0 && (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <FaBell className="mx-auto text-5xl text-slate-300" />

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No Notifications Found
              </h2>

              <p className="mt-3 text-slate-500">
                You don't have any notifications yet.
              </p>
            </div>
          )}

          {/* Notifications */}

          {!error && filteredNotifications.length > 0 && (
            <>
              <div className="mt-8 space-y-5">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
                      notification.isRead
                        ? "border-slate-200 bg-white"
                        : "border-indigo-300 bg-indigo-50"
                    }`}
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      {/* Left */}

                      <div className="flex gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-full ${
                            notification.isRead
                              ? "bg-slate-100"
                              : "bg-indigo-100"
                          }`}
                        >
                          <FaBell
                            className={`text-xl ${
                              notification.isRead
                                ? "text-slate-500"
                                : "text-indigo-600"
                            }`}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {notification.title}
                          </h3>

                          <p className="mt-2 text-slate-600">
                            {notification.message}
                          </p>

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
                          onClick={() => handleMarkRead(notification._id)}
                          className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`h-10 w-10 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-white"
                          : "border border-slate-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StudentNotifications;
