const mongoose = require("mongoose");

const DataEntry = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  district: String,
  totalChildren: Number,
  outOfSchoolChildren: Number,
  girlsPercentage: Number,
  boysPercentage: Number,
  povertyPercentage: Number,
  disabilityPercentage: Number,
  otherPercentage: Number,
  programType: String,
  date: String,
});

module.exports = mongoose.model("DataEntry", DataEntry);
