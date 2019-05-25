const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: treu
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  }
});

const SubCategory = mongoose.model("subCategory", SubCategorySchema);

module.exports = SubCategory;
