import express from "express";

import { getPlatformStatistics } from "../controllers/statistics.controller.js";

const router = express.Router();

router.get("/", getPlatformStatistics);

export default router;
