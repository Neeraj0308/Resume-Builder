import express from "express";
import { enhanceText } from "../controllers/aiController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/enhance", authMiddleware, enhanceText);

export default router;
