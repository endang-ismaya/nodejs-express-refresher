const { UserModel } = require('../database/db');
const bcrypt = require('bcrypt');

const getAllUser = async (request, response) => {
  const users = await UserModel.findAll();
  return response.status(200).json(users);
};

const getUser = async (request, response) => {
  const id = +request.params.id;
  const user = await UserModel.findOne({ where: { id } });

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  return response.json(user);
};

const createUser = async (request, response) => {
  const userData = request.body;
  userData.password = await bcrypt.hash(request.body.password, 12);
  const user = await UserModel.create(userData);
  const jsonData = user.toJSON();
  delete jsonData.password;
  return response.status(201).json(jsonData);
};

const deleteUser = async (request, response) => {
  const id = +request.params.id;
  const user = await UserModel.findByPk(id);

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  await user.destroy();
  return response.status(404).json({ message: 'User has been deleted' });
};

const updateUser = async (request, response) => {
  const id = +request.params.id;
  const user = await UserModel.findByPk(id);

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  user.email = request.body.email;
  user.password = request.body.password;
  user.save();

  return response.status(200).json(user);
};

const uploadPicture = async (req, res) => {
  if (req.hasError) {
    return res.status(400).json({ errors: req.errors });
  }

  const user = req.user;
  user.picture_url = `public/users/${req.file.filename}`;
  await user.save();
  return res.status(200).json(user);
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  uploadPicture,
};
