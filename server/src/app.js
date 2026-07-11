import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import internshipRoutes from "./routes/internship.routes.js";

import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";

import recruiterRoutes from "./routes/recruiter.routes.js";
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
app.use(errorHandler);

export default app;