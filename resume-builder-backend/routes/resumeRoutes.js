import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  saveResume,
  createResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume,
  searchResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/", authMiddleware, createResume);

// Search Route (keep before :id)
router.get("/search", authMiddleware, searchResume);

// Pagination
router.get("/", authMiddleware, getResumes);

router.get("/:id", authMiddleware, getResume);

router.put("/:id", authMiddleware, updateResume);

router.delete("/:id", authMiddleware, deleteResume);

export default router;
