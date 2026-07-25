import express from "express";
import { globalSearchController } from "../controllers/search.controller.js";

const router = express.Router();

// Global Search
router.get("/", globalSearchController);

export default router;