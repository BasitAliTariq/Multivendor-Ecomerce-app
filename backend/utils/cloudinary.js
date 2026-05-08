const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPublicIdFromUrl = (url) => {
  if (!url || typeof url !== "string") {
    return null;
  }

  const parts = url.split("/upload/");
  if (parts.length < 2) {
    return null;
  }

  const withoutQuery = parts[1].split("?")[0];
  const withoutVersion = withoutQuery.replace(/^v\d+\//, "");

  return withoutVersion.replace(/\.[^/.]+$/, "");
};

module.exports = {
  cloudinary,
  getPublicIdFromUrl,
};
