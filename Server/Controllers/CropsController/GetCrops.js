const Crops = require("../../models/Crops");

const GetCrops = async (req, res) => {
  const Crop = req.params.Crop;
  try {
    await Crops.find({ Crop: Crop }, (error, data) => {
      if (error) {
        console.log(error);
      }
      if (data.length === 0) {
        return res
          .status(200)
          .json({ success: true, message: "No related Crops" });
      }
      return res.status(200).json({ success: true, data: data });
    });
  } catch (err) {
    console.log(err);
  }
};

const GetAllCrops = async (req, res) => {
  try {
    await Crops.find({})
      .sort({ Date_Harvested: -1 })
      .exec((error, data) => {
        if (error) {
          return console.log(error);
        }
        if (data.length === 0) {
          return res
            .status(200)
            .json({ success: true, message: "No Crops Available" });
        }
        return res.status(200).json({ success: true, data: data });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetCrops, GetAllCrops };
