const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI+process.env.DB_NAME);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
