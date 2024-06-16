const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// require("dotenv").config();

cloudinary.config({
  cloud_name: "doivdewue",
  api_key: "496237749274194",
  api_secret: "rS93hT0mmfPkeSiXrPQOsM_g5vU",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "temp_nodejs",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
