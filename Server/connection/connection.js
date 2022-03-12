const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log(`connected server`));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
