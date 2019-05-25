const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Phone number is invalid");
        }
      }
    },
    address: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
