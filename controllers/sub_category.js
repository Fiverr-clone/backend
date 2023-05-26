const SubCategory = require("../models/sub_category");

// get one subCat by id
exports.getSubCategoryById = (req, res) => {
	SubCategory.find({ category_id: req.params.id })
		.then((subCategories) => {
			res.status(200).json(subCategories);
		})
		.catch((error) => {
			res.status(500).json({ error: error });
		});
};
