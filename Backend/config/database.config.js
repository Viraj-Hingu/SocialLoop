const mongoose = require("mongoose");

const ConnectTodb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("Database is Connected");
  } catch (error) {
    console.log("Error while Connecting", error);
  }
};
module.exports = ConnectTodb;
