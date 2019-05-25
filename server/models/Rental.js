const mongoose = requie("mongoose");

const RentalSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  quantity: {
    type: Number,
    required: true
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
    enum: ["On hold", "Rented", "Returned"],
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

const Rental = mongoose.model("rentals", RentalSchema);

module.exports = Renatl;
