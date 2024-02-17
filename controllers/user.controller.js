let users = [];

const getAllUser = (request, response) => {
  return response.status(200).json(users);
};

const getUser = (request, response) => {
  const targetUserId = +request.params.id;
  let user = users.find((user) => user.id === targetUserId);

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  return response.json(user);
};

const createUser = (request, response) => {
  const user = request.body;
  user.id = Date.now();
  users.push(user);
  return response.status(201).json(user);
};

const deleteUser = (request, response) => {
  targetUserId = +request.params.id;
  users = users.filter((user) => user.id !== targetUserId);
  return response
    .status(204)
    .json({ status: true, message: 'User has been deleted!' });
};

const updateUser = (request, response) => {
  const targetUserId = +request.params.id;
  let user = users.find((user) => user.id === targetUserId);

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  // remove existing user
  users = users.filter((user) => user.id !== targetUserId);

  edited_user = request.body;
  edited_user.id = targetUserId;
  users.push(edited_user);

  return response.status(200).json(edited_user);
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
