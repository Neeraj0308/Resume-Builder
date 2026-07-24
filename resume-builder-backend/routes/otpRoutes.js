import express from "express";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();
router.post("/send-email", sendOTP);
router.post("/verify", verifyOTP);

export default router;
