const { Farmer, Organization } = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const {
    category,
    username,
    password,
    confirm_password,
    address,
    city,
    state,
    country,
  } = req.body;
  if (
    !category ||
    !username ||
    !password ||
    !confirm_password ||
    !address ||
    !city ||
    !state ||
    !country
  ) {
    return res
      .status(200)
      .json({ sucess: false, message: "All fields are required" });
  }
  if (category === "Farmer") {
    var oldUser = await Farmer.findOne({ Username: username });
  }
  if (category === "Organization") {
    var oldUser = await Organization.findOne({ Username: username });
  }
  if (oldUser) {
    return res
      .status(500)
      .json({ success: false, message: "Username Already exists" });
  }
  if (password != confirm_password) {
    return res
      .status(200)
      .json({ success: false, message: "Passwords don't match" });
  }
  const encryptPass = await bcrypt.hash(password, 10);
  if (category === "Farmer") {
    const newFarmer = new Farmer({
      Username: username,
      Password: encryptPass,
      Address: address,
      City: city,
      State: state,
      Country: country,
    });
    try {
      const token = await jwt.sign(
        { Farmer_id: newFarmer._id },
        process.env.TOKEN_KEY
      );
      newFarmer.token = token;
      req.headers["x-access-token"] = token;
    } catch (err) {
      return console.log(err);
    }

    newFarmer
      .save()
      .then(res.status(200).json({ success: true, data: newFarmer }))
      .catch((err) => {
        console.log(err);
      });
  } else if (category === "Organization") {
    const newOrganization = new Organization({
      Username: username,
      Password: encryptPass,
      Address: address,
      City: city,
      State: state,
      Country: country,
    });
    const token = jwt.sign(
      { Organization_id: newOrganization.Username },
      process.env.TOKEN_KEY
    );
    newOrganization.token = token;
    req.session.token = token;
    req.headers["x-access-token"] = token;
    newOrganization
      .save()
      .then(res.status(200).json({ success: true, data: newOrganization }))
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = Register;
