const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	subCategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SubCategory",
		required: true,
	},
	description: { type: String, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	deadline: { type: Date, required: true },
	buyerInstruction: { type: String, required: false },
});

// module.exports = mongoose.model("Service", serviceSchema);