import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import internshipRoutes from "./routes/internship.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import applicationRoutes from "./routes/application.routes.js";

import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";

import recruiterRoutes from "./routes/recruiter.routes.js";
import noteRoutes from "./routes/note.routes.js";
import projectRoutes from "./routes/project.routes.js";
import communityRoutes from "./routes/community.routes.js";
import searchRoutes from "./routes/search.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StudentHub API Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);
app.use("/api/v1/internships", internshipRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/search", searchRoutes);
app.use(errorHandler);

export default app;
