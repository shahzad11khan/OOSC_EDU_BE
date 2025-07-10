const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getAllUsers", authMiddleware, userController.getAllUsers);
router.get("/me", authMiddleware, userController.getMe);
router.put("/update", authMiddleware, userController.updateUser);
router.put("/delete/:id", authMiddleware, userController.deleteUser);

router.post("/forgot-password", userController.sendOTP);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
