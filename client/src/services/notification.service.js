import api from "./api";

// ===============================
// Get Notifications
// ===============================

export const getNotifications = async (
  page = 1,
  limit = 20
) => {
  const { data } = await api.get(
    `/notifications?page=${page}&limit=${limit}`
  );

  return data;
};

// ===============================
// Get Unread Count
// ===============================

export const getUnreadCount = async () => {
  const { data } = await api.get(
    "/notifications/unread-count"
  );

  return data;
};

// ===============================
// Mark Single Notification Read
// ===============================

export const markNotificationRead = async (
  notificationId
) => {
  const { data } = await api.patch(
    `/notifications/${notificationId}/read`
  );

  return data;
};

// ===============================
// Mark All Notifications Read
// ===============================

export const markAllNotificationsRead = async () => {
  const { data } = await api.patch(
    "/notifications/read-all"
  );

  return data;
};