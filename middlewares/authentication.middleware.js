const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/db');
const fs = require('fs');
const path = require('path');

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    return next();
  }

  try {
    const privateKey = fs.readFileSync(path.join(__dirname, '../private.key'));
    const { userId } = jwt.verify(token, privateKey, { algorithms: 'RS256' });
    const user = await UserModel.findByPk(userId);
    req.user = user;
  } catch (error) {
    console.error('auth middleware', error);
  }

  return next();
};

module.exports = authentication;
