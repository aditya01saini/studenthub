const adminOnly = (req, res, next) => {
  if (!req.user) {
    const error = new Error("Authentication required.");
    error.statusCode = 401;
    throw error;
  }

  if (req.user.role !== "admin") {
    const error = new Error("Access denied. Admin privileges required.");
    error.statusCode = 403;
    throw error;
  }

  next();
};

export default adminOnly;
