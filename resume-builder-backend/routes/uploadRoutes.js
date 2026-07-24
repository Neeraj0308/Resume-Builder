// routes/uploadRoutes.js

import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, upload.single("image"), (req, res) => {
  res.json({
    success: true,
    image: req.file.filename,
  });
});

export default router;
