import asyncHandler from "../utils/asyncHandler.js";
import {
  uploadNote,
  getMyNotes,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  searchNotes,
  downloadNote
} from "../services/note.service.js";

export const uploadStudentNote = asyncHandler(async (req, res) => {
  const noteData = {
    ...req.body,
    tags: req.body.tags
      ? req.body.tags.split(",").map((tag) => tag.trim())
      : [],
  };

  const result = await uploadNote(
    req.user._id,
    noteData,
    req.file, // ✅ Change only this line
  );

  return res.status(201).json(result);
});

export const getStudentNotes = asyncHandler(async (req, res) => {
  const result = await getMyNotes(req.user._id);

  return res.status(200).json(result);
});

export const getAllStudentNotes = asyncHandler(async (req, res) => {
  const result = await getAllNotes();

  return res.status(200).json(result);
});

export const getStudentNote = asyncHandler(
  async (req, res) => {

    const result = await getSingleNote(
      req.params.noteId
    );

    return res.status(200).json(result);

  }
);

export const updateStudentNote = asyncHandler(
  async (req, res) => {

    const noteData = {
      ...req.body,
      tags: req.body.tags
        ? req.body.tags
            .split(",")
            .map((tag) => tag.trim())
        : undefined,
    };

    const result = await updateNote(
      req.user._id,
      req.params.noteId,
      noteData
    );

    return res.status(200).json(result);
  }
);

export const deleteStudentNote = asyncHandler(
  async (req, res) => {

    const result = await deleteNote(
      req.user._id,
      req.params.noteId
    );

    return res.status(200).json(result);

  }
);


export const searchStudentNotes = asyncHandler(
  async (req, res) => {

    const result = await searchNotes(
      req.query.search
    );

    return res.status(200).json(result);

  }
);

export const downloadStudentNote = asyncHandler(
  async (req, res) => {

    const result = await downloadNote(
      req.params.noteId
    );

    return res.status(200).json(result);

  }
);