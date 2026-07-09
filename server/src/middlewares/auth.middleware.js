import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Token Missing
  if (!token) {
    const error = new Error("Access denied. No token provided.");
    error.statusCode = 401;
    throw error;
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  // Attach User to Request
  req.user = user;

  next();
});