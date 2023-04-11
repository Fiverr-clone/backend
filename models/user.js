const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =mongoose.Schema({
    email:{type:String , Required:true,unique:true},
    password:{type:String , Required:true},
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);