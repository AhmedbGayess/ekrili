const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  quantity: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  }
});

const CartItem = mongoose.model("cartItems", CartItemSchema);

module.exports = CartItem;
