const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("./utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "multivendor",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

exports.upload = multer({ storage });
