import express from "express";
import upload from "../config/multer.js";

import {
  register,
  verifyEmail,
  resendOTP,
  login,
  forgotPassword,
  resendForgotPasswordOTP,
  verifyOTP,
  resetPassword,
  profile,
  updateProfile,
  changePassword,
  logout,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/resend-otp", resendForgotPasswordOTP);
router.post("/resend-otp", resendOTP);
router.post("/reset-password", resetPassword);
router.put("/change-password", authMiddleware, changePassword);

router.get("/profile", authMiddleware, profile);
router.put("/profile", authMiddleware, upload.single("image"), updateProfile);

router.post("/logout", logout);
export default router;
