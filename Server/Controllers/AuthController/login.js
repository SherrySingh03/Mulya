const { Farmer, Organization } = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { category, username, password } = req.body;
  if (!category || !username || !password) {
    return res
      .status(200)
      .json({ success: false, message: "All fields are required" });
  }
  if (category === "Farmer") {
    const User = await Farmer.findOne({ Username: username });
    if (!User) {
      return res
        .status(200)
        .json({ success: false, message: "User doesn't exist" });
    }
    if (await bcrypt.compare(password, User.Password)) {
      const token = jwt.sign({ Farmer_id: User._id }, process.env.TOKEN_KEY);
      const updatedFarmer = await Farmer.updateOne(
        { Username: username },
        { $set: { token: token } },
        { new: true, runValidators: true, credentials: true }
      );
      if (!updatedFarmer) {
        return console.log("something went wrong");
      }
      req.session.token = token;
      req.headers["x-access-token"] = token;
      console.log(req.headers);
      return res
        .status(200)
        .json({ success: true, data: updatedFarmer, token: token });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Wrong Passowrd" });
    }
  } else if (category === "Organization") {
    const User = await Organization.findOne({ Username: username });
    if (!User) {
      return res
        .status(200)
        .json({ success: false, message: "User Doesn't exist" });
    }
    if (await bcrypt.compare(password, User.Password)) {
      const token = jwt.sign(
        { Organization_if: Organization._id },
        process.env.TOKEN_KEY
      );
      const updatedOrg = await Organization.updateOne(
        { Username: username },
        { $set: { token: token } },
        { new: true, runValidators: true, credentials: true }
      );
      if (!updatedOrg) {
        return console.log("something went wrong");
      }
      req.headers["x-access-token"] = token;
      return res
        .status(200)
        .json({ success: true, data: updatedOrg, token: token });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Wrong Password" });
    }
  }
};

module.exports = Login;
