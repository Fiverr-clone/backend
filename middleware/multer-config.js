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
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPE[file.mimetype];
		const timestamp = new Date().getTime();
		const filename = `${name}_${timestamp}.${extension}`;
		callback(null, name);
	},

	// filename: (req, file, callback) => {
	// 	const name = file.originalname.split(" ").join("_");
	// 	const extension = MIME_TYPE[file.mimetype];
	// 	callback(null, name + Date.now() + "." + extension);
	// },
});
module.exports = multer({ storage: storage }).single("image");
