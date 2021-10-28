const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('authorization request');
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    throw new Error("wrong token's type");
  }

  try {
    req.user = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (e) {
    return res.status(401).json({ error: e.toString() });
  }
};
