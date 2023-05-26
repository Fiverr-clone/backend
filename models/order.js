const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	serviceId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Service",
		required: true,
	},
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	buyerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	isCompleted: { type: Boolean, default: false },
	isComfirmed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);
