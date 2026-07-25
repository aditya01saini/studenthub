import asyncHandler from "../utils/asyncHandler.js";
import { globalSearch } from "../services/search.service.js";

// Global Search
export const globalSearchController = asyncHandler(
  async (req, res) => {
    const { search } = req.query;

    const result = await globalSearch(search);

    return res.status(200).json(result);
  },
);