const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategories",
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    featuredExpires: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Ad = mongoose.model("ads", AdSchema);

module.exports = Ad;
