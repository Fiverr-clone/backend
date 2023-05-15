require("dotenv").config();

const multer = require("multer");

const cloudinary = require("cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
	process.env;

cloudinary.config({
	cloud_name: CLOUDINARY_HOST,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "services",
		format: async (req, file) => "png", // supports promises as well
		public_id: (req, file) => file.originalname,
	},
});

const parser = multer({ storage: storage });
module.exports = parser;
