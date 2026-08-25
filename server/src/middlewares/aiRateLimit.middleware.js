import rateLimit from "express-rate-limit";

const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 30,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many AI requests. Please try again after some time.",
  },
});

export default aiRateLimit;
