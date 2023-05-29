const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
	transmitterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	readByUser: {
		type: Boolean,
		default: false,
		// required: true,
	},
	lastMessage: {
		type: String,
		// required: false,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);
