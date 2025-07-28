const DataEntry = require("../models/DataEntry");

// Create new data entry
exports.createEntry = async (req, res) => {
  try {
    const newEntry = new DataEntry({
      ...req.body,
      userId: req.user.id,
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: "Error creating entry", error });
  }
};

// Get all entries (optionally filter by user)
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await DataEntry.find({ userId: req.user.id });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries", error });
  }
};

// Get entry by ID
exports.getEntryById = async (req, res) => {
  try {
    const entry = await DataEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entry", error });
  }
};

// Update entry
exports.updateEntry = async (req, res) => {
  try {
    const {
      district,
      totalChildren,
      outOfSchoolChildren,
      girlsPercentage,
      boysPercentage,
      povertyPercentage,
      disabilityPercentage,
      otherPercentage,
      programType,
      tehsil,
      unioncouncil,
      villagecouncil,
      pk,
      national,
      log,
      lat,
      date,
      age,
      totalTeachers,
      requiredFaculty,
      schoolType
    } = req.body;

    const existingEntry = await DataEntry.findById(req.params.id);
    if (!existingEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const updatedFields = {
      district: district || existingEntry.district,
      totalChildren: totalChildren ?? existingEntry.totalChildren,
      outOfSchoolChildren: outOfSchoolChildren ?? existingEntry.outOfSchoolChildren,
      girlsPercentage: girlsPercentage ?? existingEntry.girlsPercentage,
      boysPercentage: boysPercentage ?? existingEntry.boysPercentage,
      povertyPercentage: povertyPercentage ?? existingEntry.povertyPercentage,
      disabilityPercentage: disabilityPercentage ?? existingEntry.disabilityPercentage,
      otherPercentage: otherPercentage ?? existingEntry.otherPercentage,
      programType: programType || existingEntry.programType,
      date: date || existingEntry.date,
      tehsil: tehsil || existingEntry.tehsil,
      unioncouncil: unioncouncil || existingEntry.unioncouncil,
      villagecouncil: villagecouncil || existingEntry.villagecouncil,
      pk: pk || existingEntry.pk,
      national: national || existingEntry.national,
      log: log || existingEntry.log,
      lat: lat || existingEntry.lat,
      age: age || existingEntry.age,
      schoolType: schoolType || existingEntry.schoolType,
      totalTeachers: totalTeachers || existingEntry.totalTeachers,
      requiredFaculty: requiredFaculty || existingEntry.requiredFaculty
    };

    const updatedEntry = await DataEntry.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Error updating entry", error });
  }
};


// Delete entry
exports.deleteEntry = async (req, res) => {
  try {
    const deleted = await DataEntry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entry", error });
  }
};
