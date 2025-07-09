const express = require("express");
const router = express.Router();
const dataEntryController = require("../controllers/dataEntryController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new entry
router.post("/create", authMiddleware, dataEntryController.createEntry);

// Get all entries for logged-in user
router.get("/getAll", authMiddleware, dataEntryController.getAllEntries);

// Get one entry by ID
router.get("/getById/:id", authMiddleware, dataEntryController.getEntryById);

// Update an entry by ID
router.put("/updateById/:id", authMiddleware, dataEntryController.updateEntry);

// Delete an entry by ID
router.delete("/deleteById/:id", authMiddleware, dataEntryController.deleteEntry);

module.exports = router;
