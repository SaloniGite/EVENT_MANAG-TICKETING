const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/Cloudinary.config')
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'event-images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  },
});

const upload = multer({ storage });

module.exports = upload;
