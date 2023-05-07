const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const uploads = multer({ dest: "uploads/" });

const serviceCtrl = require("../controllers/service");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// router.post("/add-service", auth, multer, serviceCtrl.addService);

// router.post("/add-service", uploads.single("image"), (req, res) => {
// console.log("req", req);
// console.log("body", req.body);
// console.log("file", req.file);
// Handle the uploaded file here
// });
router.post("/add-service", multer, serviceCtrl.verifyService);

module.exports = router;
