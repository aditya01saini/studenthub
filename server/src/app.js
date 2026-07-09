import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";

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
app.use(errorHandler);

export default app;