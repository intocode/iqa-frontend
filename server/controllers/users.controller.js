const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

module.exports.usersController = {
  authUser: async (req, res) => {
    try {
      let candidate = await User.findOne({ githubId: req.user.id });

      if (!candidate) {
        candidate = await User.create({
          name: req.user.username,
          githubId: req.user.id,
          email: req.user.emails[0].value,
        });
      }

      const token = jwt.sign(
        {
          userId: candidate._id,
          name: candidate.name,
          githubId: candidate.githubId,
          email: req.user.email,
        },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.redirect(`${process.env.CLIENT_CALLBACK_URL}?token=${token}`);
    } catch (e) {
      res.json({ error: e.toString() });
    }
  },
  userCheck: async (req, res) => {
    res.json(`hello ${req.user.name}`);
  },
};
