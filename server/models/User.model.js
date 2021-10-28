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
    },
    githubId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
