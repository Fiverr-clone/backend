const mongoose = require('mongoose');

const { Schema} = mongoose;

const ConversationSchema = new Schema(
  {
    
    
    userId: {
      type: String,
      ref: 'User',
      // required: true,
    },
    receiverId: {
      type: String,
      ref: 'User',
      // required: true,
    },
    readByUser: {
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
