const mongoose = require('mongoose');

const { Schema} = mongoose;

const ConversationSchema = new Schema(
  {
    
    
    sellerId: {
      type: String,
      ref: 'User',
      // required: true,
    },
    buyerId: {
      type: String,
      ref: 'User',
      // required: true,
    },
    readBySeller: {
      type: Boolean,
      // required: true,
    },
    readByBuyer: {
      type: Boolean,
      // required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
);

module.exports = mongoose.model('Conversation', ConversationSchema);
