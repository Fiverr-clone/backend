const express = require("express");
const router = express.Router();

// const Service = require("../models/service");
const auth = require("../middleware/auth");
const cloudinaryParser = require("../middleware/cloudinary-config");
const multer = require("../middleware/multer-config");
const serviceCtrl = require("../controllers/service");

router.post("/add-service", auth, cloudinaryParser, serviceCtrl.addService);

// router.post("/services/:subcategoryId", serviceCtrl.getServicesBySubCat);

module.exports = router;
