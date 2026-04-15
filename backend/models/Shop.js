import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Hospital",
        "Salon",
        "Beauty Parlour",
        "Fitness",
        "Home Services",
      ],
    },
    service: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 1,
      max: 5,
    },
    price: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;