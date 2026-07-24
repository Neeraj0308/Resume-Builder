import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { importResume } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/import", authMiddleware, upload.single("resume"), importResume);

export default router;
