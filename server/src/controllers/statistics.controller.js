import asyncHandler from "../utils/asyncHandler.js";
import { getStatistics } from "../services/statistics.service.js";

export const getPlatformStatistics = asyncHandler(
  async (req, res) => {
    const result = await getStatistics();

    return res.status(200).json(result);
  },
);