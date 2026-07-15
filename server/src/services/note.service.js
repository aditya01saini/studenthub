import fs from "fs";

import Note from "../models/Note.js";
import StudentProfile from "../models/StudentProfile.js";

import { uploadToCloudinary } from "./upload.service.js";

export const uploadNote = async (
  userId,
  noteData,
  file
) => {

  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  if (!file) {
    const error = new Error("Please upload a PDF file.");
    error.statusCode = 400;
    throw error;
  }

  // Duplicate Check

  const existingNote = await Note.findOne({
    uploadedBy: student._id,
    title: noteData.title,
    subject: noteData.subject,
  });

  if (existingNote) {
    const error = new Error(
      "You have already uploaded this note."
    );

    error.statusCode = 400;

    throw error;
  }

  // Upload PDF to Cloudinary

  const pdfUrl = await uploadToCloudinary(
    file.path,
    "studenthub/notes",
    "raw"
  );

  // Delete Local File

 

  const note = await Note.create({

    uploadedBy: student._id,

    title: noteData.title,

    description: noteData.description,

    subject: noteData.subject,

    branch: noteData.branch,

    semester: noteData.semester,

    university: noteData.university,

    academicYear:
      noteData.academicYear,

    pdfUrl,

    thumbnail: "",

    tags: noteData.tags || [],

  });

  return {

    success: true,

    message:
      "Note uploaded successfully.",

    note,

  };

};

export const getMyNotes = async (userId) => {
  // Find Student Profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  // Get Notes
  const notes = await Note.find({
    uploadedBy: student._id,
    isActive: true,
  }).sort({
    createdAt: -1,
  });

  return {
    success: true,
    totalNotes: notes.length,
    notes,
  };
};

export const getAllNotes = async () => {

  const notes = await Note.find({
    isActive: true,
  })
    .populate({
      path: "uploadedBy",
      populate: {
        path: "user",
        select: "fullName",
      },
      select: "college course profileImage",
    })
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    totalNotes: notes.length,
    notes,
  };
};

export const getSingleNote = async (noteId) => {

  const note = await Note.findOne({
    _id: noteId,
    isActive: true,
  })
    .populate({
      path: "uploadedBy",
      populate: {
        path: "user",
        select: "fullName email",
      },
      select: "college course profileImage",
    });

  if (!note) {
    const error = new Error("Note not found.");
    error.statusCode = 404;
    throw error;
  }

  // Increase Views Count
  note.viewsCount += 1;

  await note.save();

  return {
    success: true,
    note,
  };
};

export const updateNote = async (
  userId,
  noteId,
  noteData
) => {

  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  const note = await Note.findById(noteId);

  if (!note || !note.isActive) {
    const error = new Error("Note not found.");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (
    note.uploadedBy.toString() !==
    student._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to update this note."
    );
    error.statusCode = 403;
    throw error;
  }

  note.title =
    noteData.title || note.title;

  note.description =
    noteData.description || note.description;

  note.subject =
    noteData.subject || note.subject;

  note.branch =
    noteData.branch || note.branch;

  note.semester =
    noteData.semester || note.semester;

  note.university =
    noteData.university || note.university;

  note.academicYear =
    noteData.academicYear ||
    note.academicYear;

  if (noteData.tags) {
    note.tags = noteData.tags;
  }

  await note.save();

  return {
    success: true,
    message: "Note updated successfully.",
    note,
  };
};

export const deleteNote = async (
  userId,
  noteId
) => {

  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    const error = new Error("Student profile not found.");
    error.statusCode = 404;
    throw error;
  }

  const note = await Note.findById(noteId);

  if (!note || !note.isActive) {
    const error = new Error("Note not found.");
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check
  if (
    note.uploadedBy.toString() !==
    student._id.toString()
  ) {
    const error = new Error(
      "You are not authorized to delete this note."
    );
    error.statusCode = 403;
    throw error;
  }

  note.isActive = false;

  await note.save();

  return {
    success: true,
    message: "Note deleted successfully.",
  };
};

export const searchNotes = async (query) => {

  const search = query?.trim() || "";

  const notes = await Note.find({
    isActive: true,

    $or: [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },

      {
        subject: {
          $regex: search,
          $options: "i",
        },
      },

      {
        branch: {
          $regex: search,
          $options: "i",
        },
      },

      {
        university: {
          $regex: search,
          $options: "i",
        },
      },

      {
        tags: {
          $in: [
            new RegExp(search, "i"),
          ],
        },
      },
    ],
  })
    .populate({
      path: "uploadedBy",
      populate: {
        path: "user",
        select: "fullName",
      },
      select: "college course profileImage",
    })
    .sort({
      createdAt: -1,
    });

  return {
    success: true,
    totalNotes: notes.length,
    notes,
  };
};

export const downloadNote = async (noteId) => {

  const note = await Note.findOne({
    _id: noteId,
    isActive: true,
  });

  if (!note) {
    const error = new Error("Note not found.");
    error.statusCode = 404;
    throw error;
  }

  // Increase Download Count
  note.downloadsCount += 1;

  await note.save();

  return {
  success: true,
  message: "Download started.",
  downloadsCount: note.downloadsCount,
  downloadUrl: note.pdfUrl,
};
};