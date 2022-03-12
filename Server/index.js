const express = require("express");
const { Farmer, Organization } = require("./models/Users");

require("dotenv").config();
const authRoutes = require("./Routes/AuthRoutes");
const connectDB = require("./connection/connection");
connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRoutes);

app.listen(process.env.PORT, async (res, err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server running on port ${process.env.PORT}`);
});
