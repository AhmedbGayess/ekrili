const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

const Image = mongoose.model("images", ImageSchema);

module.exports = Image;
