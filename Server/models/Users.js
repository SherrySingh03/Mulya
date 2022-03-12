const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    unique: true,
  },
  Password: String,
  token: String,
  Address: String,
  City: String,
  State: String,
  Country: String,
});

const Farmer = mongoose.model("farmer", UserSchema);
const Organization = mongoose.model("Organization", UserSchema);

module.exports = {
  Farmer,
  Organization,
};
