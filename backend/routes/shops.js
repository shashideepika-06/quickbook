import express from "express";
import Shop from "../models/Shop.js";

const router = express.Router();

// ── GET SHOPS ──
// GET /api/shops?service=Haircut&category=Salon
router.get("/", async (req, res) => {
  try {
    const { service, category } = req.query;

    let filter = {};
    if (service) filter.service = service;
    if (category) filter.category = category;

    const shops = await Shop.find(filter);
    res.status(200).json({ shops });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── GET SINGLE SHOP ──
// GET /api/shops/:id
router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ shop });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;