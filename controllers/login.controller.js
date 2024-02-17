const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/db');
const bcrypt = require('bcrypt');

const login = async (request, response) => {
  const { email, password } = request.body;

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
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
  return response.send({ token });
};

module.exports = {
  login,
};
