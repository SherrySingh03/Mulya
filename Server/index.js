const express = require("express");
require("dotenv").config();
const authRoutes = require("./Routes/AuthRoutes");
const CropRoutes = require("./Routes/CropRoutes");
const connectDB = require("./connection/connection");
const cookieSession = require("cookie-session");
const app = express();
connectDB();
app.use(
  cookieSession({
    name: "Mulya-app",
    secret: process.env.SECRET,
    httpOnly: true,
    credentials: true,
    resave: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRoutes);
app.use("/", CropRoutes);
app.listen(process.env.PORT, async (res, err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server running on port ${process.env.PORT}`);
});
