const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
	conversationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conversation",
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
