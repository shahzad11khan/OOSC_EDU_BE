const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin", "moderator"],
    default: "user",
  },
  status:{
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  otp: String,
  otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
