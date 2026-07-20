import Notification from "../models/Notification.js";

// Create Notification
export const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  application = null,
  internship = null,
  project = null,
}) => {
  const notification = await Notification.create({
    recipient,
    sender,
    type,
    title,
    message,
    application,
    internship,
    project,
  });

  return notification;
};

// Get Logged-in User Notifications
export const getNotifications = async (
  userId,
  page = 1,
  limit = 20,
) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const skip = (page - 1) * limit;

  const [notifications, totalNotifications, unreadCount] =
    await Promise.all([
      Notification.find({
        recipient: userId,
      })
        .populate("sender", "fullName role")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Notification.countDocuments({
        recipient: userId,
      }),

      Notification.countDocuments({
        recipient: userId,
        isRead: false,
      }),
    ]);

  return {
    success: true,
    currentPage: page,
    totalPages: Math.ceil(totalNotifications / limit),
    totalNotifications,
    unreadCount,
    hasNextPage:
      page < Math.ceil(totalNotifications / limit),
    hasPreviousPage: page > 1,
    notifications,
  };
};

// Get Unread Notification Count
export const getUnreadNotificationCount = async (userId) => {
  const unreadCount = await Notification.countDocuments({
    recipient: userId,
    isRead: false,
  });

  return {
    success: true,
    unreadCount,
  };
};

// Mark Single Notification As Read
export const markNotificationAsRead = async (
  userId,
  notificationId,
) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    recipient: userId,
  });

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  if (!notification.isRead) {
    notification.isRead = true;
    notification.readAt = new Date();

    await notification.save();
  }

  return {
    success: true,
    message: "Notification marked as read",
    notification,
  };
};

// Mark All Notifications As Read
export const markAllNotificationsAsRead = async (userId) => {
  const result = await Notification.updateMany(
    {
      recipient: userId,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
        readAt: new Date(),
      },
    },
  );

  return {
    success: true,
    message: "All notifications marked as read",
    modifiedCount: result.modifiedCount,
  };
};