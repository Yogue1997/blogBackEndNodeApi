const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String, // Store the URL of the profile picture
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
