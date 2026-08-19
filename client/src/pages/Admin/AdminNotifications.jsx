import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Bell,
  Send,
  RefreshCw,
  Search,
  Users,
  UserRound,
  CheckCircle2,
  Clock3,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
} from "lucide-react";

import api from "../../services/api";

// ==========================================
// TARGET OPTIONS
// ==========================================

const TARGET_OPTIONS = [
  {
    value: "all",
    label: "All Users",
  },
  {
    value: "students",
    label: "All Students",
  },
  {
    value: "recruiters",
    label: "All Recruiters",
  },
  {
    value: "user",
    label: "Specific User",
  },
];

// ==========================================
// COMPONENT
// ==========================================

const AdminNotifications = () => {
  // ==========================================
  // FORM
  // ==========================================

  const [target, setTarget] = useState("all");

  const [userId, setUserId] = useState("");

  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  // ==========================================
  // USERS
  // ==========================================

  const [users, setUsers] = useState([]);

  const [usersLoading, setUsersLoading] = useState(false);

  // ==========================================
  // NOTIFICATION HISTORY
  // ==========================================

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // PAGINATION
  // ==========================================

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalNotifications: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // ==========================================
  // SEND LOADING
  // ==========================================

  const [sending, setSending] = useState(false);

  // ==========================================
  // FETCH NOTIFICATION HISTORY
  // ==========================================

  const fetchNotifications = useCallback(
    async (showRefreshLoader = false) => {
      try {
        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const params = {
          page,
          limit: 10,
        };

        if (search.trim()) {
          params.search = search.trim();
        }

        const response = await api.get("/admin/notifications", {
          params,
        });

        const data = response.data;

        if (data.success) {
          setNotifications(data.notifications || []);

          setPagination({
            totalPages: data.totalPages || 1,

            totalNotifications: data.totalNotifications || 0,

            hasNextPage: data.hasNextPage || false,

            hasPreviousPage: data.hasPreviousPage || false,
          });
        }
      } catch (err) {
        console.error("Failed to fetch notification history:", err);

        setError(
          err.response?.data?.message || "Unable to load notification history.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, search],
  );

  // ==========================================
  // FETCH USERS
  // ==========================================

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);

      const response = await api.get("/admin/users", {
        params: {
          page: 1,
          limit: 100,
        },
      });

      const data = response.data;

      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ==========================================
  // SEARCH RESET
  // ==========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) {
        setPage(1);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // ==========================================
  // SEND NOTIFICATION
  // ==========================================

  const handleSendNotification = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Please enter a notification title.");

      return;
    }

    if (!message.trim()) {
      setError("Please enter a notification message.");

      return;
    }

    if (target === "user" && !userId) {
      setError("Please select a user.");

      return;
    }

    try {
      setSending(true);

      const payload = {
        target,
        title: title.trim(),
        message: message.trim(),
      };

      if (target === "user") {
        payload.userId = userId;
      }

      const response = await api.post("/admin/notifications", payload);

      if (response.data.success) {
        setSuccess(response.data.message || "Notification sent successfully.");

        setTitle("");
        setMessage("");
        setUserId("");

        await fetchNotifications(true);
      }
    } catch (err) {
      console.error("Failed to send notification:", err);

      setError(err.response?.data?.message || "Unable to send notification.");
    } finally {
      setSending(false);
    }
  };

  // ==========================================
  // CLEAR FORM
  // ==========================================

  const clearForm = () => {
    setTitle("");
    setMessage("");
    setUserId("");
    setError("");
    setSuccess("");
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // TARGET LABEL
  // ==========================================

  const getTargetLabel = (notification) => {
    if (
      notification?.userId ||
      notification?.target === "user" ||
      notification?.target === "specific" ||
      notification?.target === "individual"
    ) {
      return "Specific User";
    }

    if (notification?.target === "students") {
      return "All Students";
    }

    if (notification?.target === "recruiters") {
      return "All Recruiters";
    }

    if (notification?.target === "all") {
      return "All Users";
    }

    return "All Users";
  };

  return (
    <div
      className="
      min-h-full
      bg-slate-50/70
      p-4
      sm:p-6
      lg:p-8
    "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        space-y-6
      "
      >
        {/* ======================================
            HEADER
        ======================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-indigo-500
            "
            >
              COMMUNICATION
            </p>

            <h1
              className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
            "
            >
              Notifications
            </h1>

            <p
              className="
              mt-1
              text-sm
              text-slate-500
            "
            >
              Send announcements and manage notification history.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchNotifications(true)}
            disabled={refreshing}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-slate-600
              shadow-sm
              transition
              hover:bg-slate-50
              disabled:opacity-50
            "
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </motion.div>

        {/* ======================================
            ALERTS
        ======================================= */}

        {error && (
          <div
            className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            py-3
            text-xs
            text-red-700
          "
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />

            <span className="flex-1">{error}</span>

            <button type="button" onClick={() => setError("")}>
              <X size={15} />
            </button>
          </div>
        )}

        {success && (
          <div
            className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-emerald-100
            bg-emerald-50
            px-4
            py-3
            text-xs
            text-emerald-700
          "
          >
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />

            <span className="flex-1">{success}</span>

            <button type="button" onClick={() => setSuccess("")}>
              <X size={15} />
            </button>
          </div>
        )}

        {/* ======================================
            MAIN GRID
        ======================================= */}

        <div
          className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[400px_1fr]
        "
        >
          {/* ====================================
              SEND NOTIFICATION
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              sm:p-6
            "
          >
            <div
              className="
              flex
              items-start
              gap-3
            "
            >
              <div
                className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
              "
              >
                <Bell size={20} />
              </div>

              <div>
                <h2
                  className="
                  text-sm
                  font-bold
                  text-slate-900
                "
                >
                  Send Notification
                </h2>

                <p
                  className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-400
                "
                >
                  Send an announcement to students, recruiters or a specific
                  user.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSendNotification}
              className="
                mt-6
                space-y-4
              "
            >
              {/* Target */}

              <div>
                <label
                  className="
                  mb-2
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
                >
                  Target Audience
                </label>

                <select
                  value={target}
                  onChange={(event) => {
                    setTarget(event.target.value);

                    setUserId("");
                  }}
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    text-slate-600
                    outline-none
                    transition
                    focus:border-indigo-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                >
                  {TARGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specific User */}

              {target === "user" && (
                <div>
                  <label
                    className="
                    mb-2
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                  >
                    Select User
                  </label>

                  <select
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    disabled={usersLoading}
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      text-slate-600
                      outline-none
                      transition
                      focus:border-indigo-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-indigo-50
                      disabled:opacity-60
                    "
                  >
                    <option value="">
                      {usersLoading ? "Loading users..." : "Select a user"}
                    </option>

                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName || user.name || user.email}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Title */}

              <div>
                <label
                  className="
                  mb-2
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
                >
                  Notification Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={100}
                  placeholder="Enter notification title"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                />

                <div
                  className="
                  mt-1
                  text-right
                  text-[9px]
                  text-slate-300
                "
                >
                  {title.length}/100
                </div>
              </div>

              {/* Message */}

              <div>
                <label
                  className="
                  mb-2
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
                >
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={500}
                  rows={5}
                  placeholder="Write your notification message..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-slate-700
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                />

                <div
                  className="
                  mt-1
                  text-right
                  text-[9px]
                  text-slate-300
                "
                >
                  {message.length}/500
                </div>
              </div>

              {/* Actions */}

              <div
                className="
                flex
                flex-col
                gap-2
                pt-2
                sm:flex-row
              "
              >
                <button
                  type="submit"
                  disabled={sending}
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-slate-900
                    px-4
                    py-3
                    text-xs
                    font-bold
                    text-white
                    transition
                    hover:bg-slate-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {sending ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Notification
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearForm}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    text-slate-500
                    transition
                    hover:bg-slate-50
                  "
                >
                  Clear
                </button>
              </div>
            </form>
          </motion.div>

          {/* ====================================
              HISTORY
          ===================================== */}

          <div
            className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
          >
            <div
              className="
              flex
              flex-col
              gap-4
              border-b
              border-slate-100
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
            >
              <div>
                <h2
                  className="
                  text-sm
                  font-bold
                  text-slate-900
                "
                >
                  Notification History
                </h2>

                <p
                  className="
                  mt-1
                  text-xs
                  text-slate-400
                "
                >
                  {pagination.totalNotifications} notifications sent
                </p>
              </div>

              {/* Search */}

              <div
                className="
                relative
                w-full
                sm:w-64
              "
              >
                <Search
                  size={15}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search notifications..."
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-9
                    pr-3
                    text-xs
                    text-slate-600
                    outline-none
                    transition
                    focus:border-indigo-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-50
                  "
                />
              </div>
            </div>

            {/* Loading */}

            {loading ? (
              <div
                className="
                space-y-3
                p-5
              "
              >
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                        animate-pulse
                        rounded-xl
                        border
                        border-slate-100
                        p-4
                      "
                  >
                    <div
                      className="
                        h-3
                        w-40
                        rounded
                        bg-slate-100
                      "
                    />

                    <div
                      className="
                        mt-3
                        h-3
                        w-72
                        rounded
                        bg-slate-100
                      "
                    />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className="
                flex
                flex-col
                items-center
                justify-center
                px-6
                py-14
                text-center
              "
              >
                <AlertCircle size={24} className="text-red-400" />

                <p
                  className="
                  mt-3
                  text-sm
                  font-bold
                  text-slate-800
                "
                >
                  Unable to load history
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div
                className="
                flex
                flex-col
                items-center
                justify-center
                px-6
                py-14
                text-center
              "
              >
                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-100
                  text-slate-400
                "
                >
                  <Bell size={24} />
                </div>

                <p
                  className="
                  mt-4
                  text-sm
                  font-bold
                  text-slate-800
                "
                >
                  No notifications found
                </p>

                <p
                  className="
                  mt-1
                  text-xs
                  text-slate-400
                "
                >
                  Notification history will appear here.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop */}

                <div
                  className="
                  hidden
                  overflow-x-auto
                  md:block
                "
                >
                  <table
                    className="
                    w-full
                    min-w-[650px]
                  "
                  >
                    <thead>
                      <tr
                        className="
                        border-b
                        border-slate-100
                        bg-slate-50/70
                      "
                      >
                        <th
                          className="
                          px-5
                          py-3
                          text-left
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                        "
                        >
                          Notification
                        </th>

                        <th
                          className="
                          px-5
                          py-3
                          text-left
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                        "
                        >
                          Target
                        </th>

                        <th
                          className="
                          px-5
                          py-3
                          text-left
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                        "
                        >
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {notifications.map((notification, index) => (
                        <motion.tr
                          key={notification._id}
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          transition={{
                            delay: index * 0.03,
                          }}
                          className="
                              border-b
                              border-slate-100
                              last:border-0
                              hover:bg-slate-50/50
                            "
                        >
                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <div
                              className="
                                flex
                                items-start
                                gap-3
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-indigo-50
                                  text-indigo-600
                                "
                              >
                                <Bell size={15} />
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="
                                    max-w-[380px]
                                    truncate
                                    text-xs
                                    font-bold
                                    text-slate-800
                                  "
                                >
                                  {notification.title || "Notification"}
                                </p>

                                <p
                                  className="
                                    mt-1
                                    max-w-[420px]
                                    truncate
                                    text-[11px]
                                    text-slate-400
                                  "
                                >
                                  {notification.message || "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                border
                                border-slate-200
                                bg-slate-50
                                px-2.5
                                py-1.5
                                text-[10px]
                                font-bold
                                text-slate-600
                              "
                            >
                              {notification.target === "user" ? (
                                <UserRound size={12} />
                              ) : (
                                <Users size={12} />
                              )}

                              {getTargetLabel(notification)}
                            </span>
                          </td>

                          <td
                            className="
                              px-5
                              py-4
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-slate-500
                              "
                            >
                              <Clock3 size={13} className="text-slate-400" />

                              {formatDate(notification.createdAt)}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile */}

                <div
                  className="
                  space-y-3
                  p-4
                  md:hidden
                "
                >
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="
                          rounded-xl
                          border
                          border-slate-100
                          p-4
                        "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-indigo-50
                            text-indigo-600
                          "
                        >
                          <Bell size={15} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              text-xs
                              font-bold
                              text-slate-800
                            "
                          >
                            {notification.title || "Notification"}
                          </p>

                          <p
                            className="
                              mt-1
                              text-[11px]
                              leading-5
                              text-slate-400
                            "
                          >
                            {notification.message || "—"}
                          </p>

                          <div
                            className="
                              mt-3
                              flex
                              flex-wrap
                              items-center
                              gap-2
                            "
                          >
                            <span
                              className="
                                rounded-lg
                                bg-slate-50
                                px-2
                                py-1
                                text-[9px]
                                font-semibold
                                text-slate-500
                              "
                            >
                              {getTargetLabel(notification)}
                            </span>

                            <span
                              className="
                                text-[9px]
                                text-slate-400
                              "
                            >
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-slate-100
                  px-5
                  py-4
                "
                >
                  <p
                    className="
                    text-xs
                    text-slate-400
                  "
                  >
                    Page{" "}
                    <span
                      className="
                      font-semibold
                      text-slate-600
                    "
                    >
                      {page}
                    </span>{" "}
                    of{" "}
                    <span
                      className="
                      font-semibold
                      text-slate-600
                    "
                    >
                      {pagination.totalPages}
                    </span>
                  </p>

                  <div
                    className="
                    flex
                    gap-2
                  "
                  >
                    <button
                      type="button"
                      disabled={!pagination.hasPreviousPage}
                      onClick={() =>
                        setPage((current) => Math.max(current - 1, 1))
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-500
                        disabled:opacity-40
                      "
                    >
                      <ChevronLeft size={15} />
                    </button>

                    <button
                      type="button"
                      disabled={!pagination.hasNextPage}
                      onClick={() => setPage((current) => current + 1)}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-500
                        disabled:opacity-40
                      "
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
