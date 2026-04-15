import express from "express";
import Booking from "../models/Booking.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ── GET MY BOOKINGS ──
// GET /api/bookings
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── CREATE BOOKING ──
// POST /api/bookings
router.post("/", protect, async (req, res) => {
  try {
    const { shopName, location, service, category, date, time, price } =
      req.body;

    if (!shopName || !service || !date || !time) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      shopName,
      location,
      service,
      category,
      date,
      time,
      price,
      status: "Confirmed",
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── CANCEL BOOKING ──
// PATCH /api/bookings/:id
router.patch("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Make sure booking belongs to logged in user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── DELETE BOOKING ──
// DELETE /api/bookings/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Make sure booking belongs to logged in user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await booking.deleteOne();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;