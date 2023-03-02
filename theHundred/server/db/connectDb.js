const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const data = await mongoose.connect(
      "mongodb://127.0.0.1:27017/theHundredDB"
    );
    if (data) console.log("connected to mongodb");
  } catch (err) {
    console.log("Connection Error", err);
  }
};

module.exports = connectDb;
