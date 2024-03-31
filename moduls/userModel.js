const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name reqquired"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email reqquired"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password reqquired"],
      minlenth: [6, "Too short password"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);
const user = mongoose.model("User", userSchema);
module.exports = user;
