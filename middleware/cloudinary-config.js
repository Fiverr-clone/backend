require("dotenv").config();

const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const MIME_TYPE = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/gif": "gif",
	"image/x-icon": "ico",
};

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_HOST,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: (req, file) => {
		const name = file.originalname.split(" ").join("_").split(".")[0];
		const extension = MIME_TYPE[file.mimetype];
		const timestamp = Date.now();
		const publicId = `${name}-${timestamp}`;
		// const publicId = `${name}-${timestamp}.${extension}`;
		return {
			folder: "uploads",
			public_id: publicId,
			format: extension,
		};
	},
});

module.exports = multer({ storage: storage }).single("image");
