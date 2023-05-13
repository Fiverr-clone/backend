const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: { type: String, required: true },
});

categorySchema.statics.getCategoryById = function (categoryId) {
  return this.findById(categoryId).exec();
};

module.exports = mongoose.model("Category", categorySchema);

// const mongoose = require("mongoose");


// const categorySchema = mongoose.Schema({
// 	categoryName: { type: String, Required: true },
	
// });


// module.exports = mongoose.model("Category", categorySchema);