const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
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
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "ar-TN")) {
          throw new Error("Phone number is invalid");
        }
      }
    },
    image: {
      type: String
    },
    favorites: [
      {
        type: Object
      }
    ],
    admin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

UserSchema.virtual("ads", {
  ref: "ads",
  localField: "_id",
  foreignField: "user"
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
