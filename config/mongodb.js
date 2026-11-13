const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const uri = process.env.MongoURI;
  if (!uri) {
    console.error("FATAL: MongoURI env var is missing. Set it in Railway > Variables.");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
