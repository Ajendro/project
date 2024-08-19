const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  profile: {
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },  
    bio: String,
    location: String,
    avatar: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
