const mongoose = require("mongoose");

const sub_categorySchema = mongoose.Schema({
	name: { type: String, required: true },
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
});

sub_categorySchema.statics.getSubCategoryById = function (subcategoryId) {
	return this.findById(subcategoryId).exec();
};

module.exports = mongoose.model("SubCategory", sub_categorySchema);
