const Category = require("../models/category");

// Get all categories
exports.getAllCategories = (req, res) => {
	Category.find()
		.then((categories) => {
			res.status(200).json(categories);
		})
		.catch((error) => {
			res.status(500).json({
				error: error.message,
			});
		});
};

// Get a single category by ID
exports.getCategoryById = (req, res) => {
	Category.findById(req.params.categoryId)
		.then((category) => {
			if (!category) {
				return res.status(404).json({
					message: "Category not found",
				});
			}
			res.status(200).json(category);
		})
		.catch((error) => {
			res.status(500).json({
				error: error.message,
			});
		});
};
