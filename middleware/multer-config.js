const multer = require("multer");
const MIME_TYPE = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "uploads");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_").split(".")[0];
		const extension = MIME_TYPE[file.mimetype];
		const timestamp = Date.now();
		const newFilename = `${name}-${timestamp}.${extension}`;
		callback(null, newFilename);
	},
});
module.exports = multer({ storage: storage }).single("image");
