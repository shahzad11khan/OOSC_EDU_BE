const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTPEmail = require("../utils/sendOTPEmail");
const crypto = require("crypto");

// Register new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword,role,status } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, confirmPassword,role,status });

    const token = jwt.sign({ id: newUser._id, name, email, role, status }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user: { id: newUser._id, name, email }, token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ user: { id: user._id, name: user.name, email }, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword,role,status } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let updatedFields = {
      name: name || user.name,
      email: email || user.email,
      confirmPassword: confirmPassword || user.confirmPassword,
      role: role || user.role,
      status: status || user.status
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    } else {
      updatedFields.password = user.password;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};


// Get all user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Delete user
exports.deleteUser= async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

// Generate and send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

// Verify OTP and reset password
exports.resetPassword = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;

    // Step 1: Find user by email
    const user = await User.findOne({  otp });

    // Step 2: Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Step 3: Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Step 4: Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Reset failed", error: err.message });
  }
};