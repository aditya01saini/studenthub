import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import { uploadResume } from "../middlewares/upload.middleware.js";
import {
  uploadStudentNote,
  getStudentNotes,
  getAllStudentNotes,
  getStudentNote,
  updateStudentNote,
  deleteStudentNote,
  searchStudentNotes,
  downloadStudentNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("student"),
  uploadResume.single("pdf"),
  uploadStudentNote,
);
router.get("/my-notes", protect, authorize("student"), getStudentNotes);
router.get("/search", searchStudentNotes);
router.get("/", getAllStudentNotes);
router.get("/:noteId/download", downloadStudentNote);

router.put("/:noteId", protect, authorize("student"), updateStudentNote);

router.get("/:noteId", getStudentNote);
router.delete("/:noteId", protect, authorize("student"), deleteStudentNote);
export default router;
