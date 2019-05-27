const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true
  }
});

SubCategorySchema.virtual("products", {
  ref: "products",
  localField: "_id",
  foreignField: "subCategory"
});

const SubCategory = mongoose.model("subCategories", SubCategorySchema);

module.exports = SubCategory;
