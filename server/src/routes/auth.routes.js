import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
   getMe,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;