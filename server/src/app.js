import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";

import internshipRoutes from "./routes/internship.routes.js";
import applicationRoutes from "./routes/application.routes.js";

import noteRoutes from "./routes/note.routes.js";
import projectRoutes from "./routes/project.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import communityRoutes from "./routes/community.routes.js";
import communityCommentRoutes from "./routes/communityComment.routes.js";

import searchRoutes from "./routes/search.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import statisticsRoutes from "./routes/statistics.routes.js";

import aiRoutes from "./routes/ai.routes.js";
const app = express();

// Global Middleware

app.use(cors());
app.use(express.json());

// Health Check

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudentHub API Running",
  });
});

// API Routes

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/student", studentRoutes);

app.use("/api/v1/recruiter", recruiterRoutes);

app.use("/api/v1/internships", internshipRoutes);

app.use("/api/v1/applications", applicationRoutes);

app.use("/api/v1/notes", noteRoutes);

app.use("/api/v1/projects", projectRoutes);

app.use("/api/v1/notifications", notificationRoutes);

// Community
app.use("/api/v1/community", communityRoutes);

app.use("/api/v1/community-comments", communityCommentRoutes);

app.use("/api/v1/search", searchRoutes);

app.use("/api/v1/statistics", statisticsRoutes);

// Global Error Handler

app.use(errorHandler);

app.use("/api/v1/admin", adminRoutes);

//ai
app.use("/api/v1/ai", aiRoutes);

export default app;
