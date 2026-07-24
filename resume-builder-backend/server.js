import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

import path from "path";
import errorMiddleware from "./middleware/errorMiddleware.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

import otpRoutes from "./routes/otpRoutes.js";
import helmet from "helmet";

import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    const app = express();

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );
    app.use(express.json());

    app.use(
      helmet({
        crossOriginResourcePolicy: {
          policy: "cross-origin",
        },
      }),
    );
    app.post("/test", (req, res) => {
      console.log("TEST BODY:", req.body);

      res.json({
        success: true,
        body: req.body,
      });
    });

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/resume", resumeRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/pdf", pdfRoutes);
    // app.use("/api/otp", otpRoutes);
    app.use("/api/ai", aiRoutes);

    // Test Route
    app.get("/", (req, res) => {
      res.json({
        success: true,
        message: "Resume Builder API Running 🚀",
      });
    });

    const PORT = process.env.PORT || 5000;

    app.use(errorMiddleware);
    app.use("/uploads", express.static("uploads"));

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// post :http://localhost:5000/api/auth/register
// {
// "name": "Neeraj Patel",
// "email": "neeraj@gmail.com",
// "password": "123456"
// }

//post :http://localhost:5000/api/auth/login
// {
//   "email": "neeraj@gmail.com",
//   "password": "123456"
// }
