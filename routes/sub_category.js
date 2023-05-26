const express = require("express");
const router = express.Router();

const subCategoryController = require("../controllers/sub_category");

// GET subcategory by ID and populate category
router.get("/:id", subCategoryController.getSubCategoryById);

module.exports = router;
