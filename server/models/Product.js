const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    available: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategories"
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
