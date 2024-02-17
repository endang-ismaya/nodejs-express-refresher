const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/db');

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    return next();
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findByPk(userId);
    req.user = user;
  } catch (error) {
    console.error('auth middleware', error);
  }

  return next();
};

module.exports = authentication;
