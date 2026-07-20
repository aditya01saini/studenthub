import express from "express";

import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get Logged-in User Notifications
router.get(
  "/",
  protect,
  getUserNotifications,
);

// Get Unread Notification Count
router.get(
  "/unread-count",
  protect,
  getUnreadCount,
);

// Mark All Notifications As Read
router.patch(
  "/read-all",
  protect,
  markAllAsRead,
);

// Mark Single Notification As Read
router.patch(
  "/:notificationId/read",
  protect,
  markAsRead,
);

export default router;