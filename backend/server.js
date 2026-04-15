import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import shopRoutes from "./routes/shops.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();

// ── Middleware ──
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/bookings", bookingRoutes);

// ── Test route ──
app.get("/", (req, res) => {
  res.json({ message: "QuickBook API is running!" });
});

// ── Connect to MongoDB and start server ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });