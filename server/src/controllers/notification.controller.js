import asyncHandler from "../utils/asyncHandler.js";

import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notification.service.js";

// Get Logged-in User Notifications
export const getUserNotifications = asyncHandler(
  async (req, res) => {
    const { page, limit } = req.query;

    const result = await getNotifications(
      req.user._id,
      page,
      limit,
    );

    return res.status(200).json(result);
  },
);

// Get Unread Notification Count
export const getUnreadCount = asyncHandler(
  async (req, res) => {
    const result = await getUnreadNotificationCount(
      req.user._id,
    );

    return res.status(200).json(result);
  },
);

// Mark Single Notification As Read
export const markAsRead = asyncHandler(
  async (req, res) => {
    const result = await markNotificationAsRead(
      req.user._id,
      req.params.notificationId,
    );

    return res.status(200).json(result);
  },
);

// Mark All Notifications As Read
export const markAllAsRead = asyncHandler(
  async (req, res) => {
    const result = await markAllNotificationsAsRead(
      req.user._id,
    );

    return res.status(200).json(result);
  },
);