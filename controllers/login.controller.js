const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/db');
const bcrypt = require('bcrypt');
const { loginValidation } = require('../validators/user.validators');

const login = async (request, response) => {
  try {
    const userData = await loginValidation.validate(request.body, {
      abortEarly: false,
    });

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

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });
    return response.send({ token });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
};
