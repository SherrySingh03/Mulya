const mongoose = require("mongoose");
const CropsSchema = new mongoose.Schema({
  Farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
  },
  Crop: String,
  Quantity: Number,
  Date_Harvested: {
    type: Date,
    default: Date.now,
  },
  ExpectedPricePerUnit: Number,
  Sold: {
    type: Boolean,
    default: false,
  },
});
const Crops = mongoose.model("Crop", CropsSchema);

module.exports = Crops;
