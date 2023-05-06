const express = require("express");
const router = express.Router();

const serviceCtrl = require("../controllers/service");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/add-service", auth, serviceCtrl.addService);

// router.post("/add-service", serviceCtrl.addService);
// router.post("/add-service", auth, multer, serviceCtrl.addService);

module.exports = router;
