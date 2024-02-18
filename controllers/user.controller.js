const { UserModel } = require('../database/db');
const bcrypt = require('bcrypt');
const {
  createUserValidator,
  updateUserValidator,
} = require('../validators/user.validators');

const getAllUser = async (request, response) => {
  const users = await UserModel.findAll();
  return response.status(200).json(users);
};

const getUser = async (request, response) => {
  const id = +request.params.id;
  const user = await UserModel.findOne({
    where: { id },
    attributes: { exclude: ['password'] }, // Exclude the password field
  });

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  return response.json(user);
};

const createUser = async (request, response) => {
  try {
    const userData = await createUserValidator.validate(request.body, {
      abortEarly: false,
    });

    userData.password = await bcrypt.hash(request.body.password, 12);
    const user = await UserModel.create(userData);
    const jsonData = user.toJSON();
    delete jsonData.password;
    return response.status(201).json(jsonData);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const deleteUser = async (request, response) => {
  const id = +request.params.id;
  const user = await UserModel.findByPk(id);

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  if (user.id == request.user.id) {
    return response.status(403).json({ message: 'You cannot delete yourself' });
  }

  await user.destroy();
  return response.status(404).json({ message: 'User has been deleted' });
};

const updateUser = async (request, response) => {
  try {
    console.log('user.controller::updateUser');

    const id = +request.params.id;
    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const userData = await updateUserValidator.validate(request.body, {
      abortEarly: false,
      context: request.user.email,
    });

    console.log(userData);

    user.email = userData.email;
    user.password = await bcrypt.hash(userData.password, 12);
    await user.save();

    const jsonData = user.toJSON();
    delete jsonData.password;

    return response.status(200).json(jsonData);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
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
