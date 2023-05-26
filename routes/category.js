const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/category");

router.get("/", categoryCtrl.getAllCategories);

router.get("/:categoryId", categoryCtrl.getCategoryById);

module.exports = router;
