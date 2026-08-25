import jwt from "jsonwebtoken";

import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token = Guest User
  if (!token) {
    return next();
  }

  // Verify Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find User
  const user = await User.findById(decoded.id).select("-password");

  // User not found
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  // Attach logged-in user
  req.user = user;

  next();
});
