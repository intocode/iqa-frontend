const mongoose = require('mongoose');
const { model } = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    githubId: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
