const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/db');
const bcrypt = require('bcrypt');
const { loginValidator } = require('../validators/user.validators');
const fs = require('fs');
const path = require('path');
const sendMessage = require('../helpers/send-message.helper');

const login = async (request, response) => {
  try {
    console.log('login.controller::login');
    console.log(request.body);

    const userData = await loginValidator.validate(request.body, {
      abortEarly: false,
    });

    console.log(userData);

    const { email, password } = userData;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return response
        .status(401)
        .json({ message: 'email or password incorrect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response
        .status(401)
        .json({ message: 'email or password incorrect' });
    }

    const privateKey = fs.readFileSync(path.join(__dirname, '../private.key'));

    const payload = { userId: user.id };
    const token = jwt.sign(payload, privateKey, {
      expiresIn: '4h',
      algorithm: 'RS256',
    });
    sendMessage(request.wss, { type: 'login_success' });
    return response.send({ token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors specifically
      return response
        .status(400)
        .json({ message: error.message, errors: error.errors });
    } else {
      // Handle other errors
      console.error(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = {
  login,
};
