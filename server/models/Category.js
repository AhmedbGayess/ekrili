const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  }
});

CategorySchema.virtual("subCategories", {
  ref: "subCategories",
  localField: "_id",
  foreignField: "category"
});

const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;
