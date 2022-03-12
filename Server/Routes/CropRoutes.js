const express = require("express");
const app = express();
const {
  GetCrops,
  GetAllCrops,
} = require("../Controllers/CropsController/GetCrops");
const PostCrops = require("../Controllers/CropsController/PostCrops");
const router = express.Router();
const verifyToken = require("../Middlewares/auth");

router.route("/crops/:Crop").get(verifyToken, GetCrops);
router.route("/crops").get(verifyToken, GetAllCrops);
router.route("/addcrop").post(verifyToken, PostCrops);

module.exports = router;
