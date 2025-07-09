const express = require("express");
const router = express.Router();
const dataEntryController = require("../controllers/dataEntryController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new entry
router.post("/", authMiddleware, dataEntryController.createEntry);

// Get all entries for logged-in user
router.get("/", authMiddleware, dataEntryController.getAllEntries);

// Get one entry by ID
router.get("/:id", authMiddleware, dataEntryController.getEntryById);

// Update an entry by ID
router.put("/:id", authMiddleware, dataEntryController.updateEntry);

// Delete an entry by ID
router.delete("/:id", authMiddleware, dataEntryController.deleteEntry);

module.exports = router;
