const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
	categoryName: { type: String, Required: true },
	
});


module.exports = mongoose.model("Category", categorySchema);