import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // Jis user ko notification milega
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Notification kis user ki action se generate hua
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      enum: [
        "APPLICATION_RECEIVED",
        "APPLICATION_SHORTLISTED",
        "APPLICATION_ACCEPTED",
        "APPLICATION_REJECTED",
        "NEW_FOLLOWER",
        "PROJECT_LIKED",
        "SYSTEM",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Related resource IDs
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      default: null,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Fast notification listing
notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

// Fast unread notification count
notificationSchema.index({
  recipient: 1,
  isRead: 1,
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema,
);

export default Notification;