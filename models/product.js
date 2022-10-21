const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      maxlength: 255,
    },
    photo: {
      type: String,
    },
    numReviews: {
      type: String,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    reviews: [ReviewSchema],
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
