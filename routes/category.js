const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/category");

router.get("/", categoryCtrl.getAllCategories);

router.get("/online-courses", categoryCtrl.onlineCourses);
router.get("/digital-marketing", categoryCtrl.digitalMarketing);
router.get("/writing-translation", categoryCtrl.writingTranslation);
router.get("/design", categoryCtrl.design);
router.get("/programming-development", categoryCtrl.programmingDevelopment);

router.get("/:categoryId", categoryCtrl.getCategoryById);

module.exports = router;
