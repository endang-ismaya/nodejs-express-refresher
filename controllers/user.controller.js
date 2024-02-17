const { UserModel } = require('../database/db');

let users = [];

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
  const user = await UserModel.create(request.body);
  return response.status(201).json(user.dataValues);
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

module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
