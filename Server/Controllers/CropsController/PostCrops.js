const { Farmer } = require("../../models/Users");
const Crop = require("../../models/Crops");

const PostCrops = async (req, res) => {
  const token =
    req.query.token ||
    req.headers["x-access-token"] ||
    req.params.token ||
    req.session.token;
  const farmer = await Farmer.findOne({ token: token });
  console.log(farmer);
  const { CropName, Quantity, HarvestDate, ExpectedPrice } = req.body;
  if (!CropName || !Quantity || !ExpectedPrice) {
    return res
      .status(200)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newCrop = new Crop({
      Farmer: farmer._id,
      Crop: CropName,
      Quantity: Number(Quantity),
      Date_Harvested: Date(HarvestDate),
      ExpectedPricePerUnit: Number(ExpectedPrice),
    });
    newCrop
      .save()
      .then(res.status(200).json({ success: true, data: newCrop }))
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = PostCrops;
