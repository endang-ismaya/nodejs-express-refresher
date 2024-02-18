const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./database/db');

const express = require('express');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const authentication = require('./middlewares/authentication.middleware');
const path = require('path');
const app = express();
const PORT = 3000;

const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 5129 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('send some messages...');
});

// middleware to put the websocket into the request
app.use((req, res, next) => {
  req.wss = wss;
  next();
});

// json
app.use(express.json());
app.use(authentication);

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/public', express.static('public'));

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log(`Server running on PORT ${PORT}`);
  } catch (error) {
    console.error('error', error);
  }
});
