const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now()
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["On hold", "Confirmed", "Shipped", "Rented", "Returned", "Canceled"],
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  }
});

const Rental = mongoose.model("rentals", RentalSchema);

module.exports = Rental;
