const mongoose = require("mongoose");

module.exports = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};
