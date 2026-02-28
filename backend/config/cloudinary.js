const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Use your keys from the Cloudinary Dashboard
cloudinary.config({
  cloud_name: process.env.CLOUDY_NAME,
  api_key: process.env.CLOUDY_KEY,
  api_secret: process.env.CLOUDY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'infrascale_services', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

module.exports = { cloudinary, storage };