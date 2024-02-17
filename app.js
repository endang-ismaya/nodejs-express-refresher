const express = require('express');
const app = express();

const PORT = 3000;

// json
app.use(express.json());

let users = [];

// route
app.get('/', (request, response) => {
  return response.status(200).json(users);
});

app.post('/', (request, response) => {
  const user = request.body;
  user.id = Date.now();
  users.push(user);
  return response.status(201).json(user);
});

app.delete('/:id', (request, response) => {
  targetUserId = +request.params.id;
  users = users.filter((user) => user.id !== targetUserId);
  return response
    .status(204)
    .json({ status: true, message: 'User has been deleted!' });
});

app.get('/:id', (request, response) => {
  const targetUserId = +request.params.id;
  let user = users.find((user) => user.id === targetUserId);

  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  return response.json(user);
});

app.put('/:id', (request, response) => {
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
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
