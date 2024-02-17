const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./database/db');

const express = require('express');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const authentication = require('./middlewares/authentication.middleware');

const app = express();
const PORT = 3000;

// json
app.use(express.json());
app.use(authentication);

// routes
app.use('/users', userRoute);
app.use('/login', loginRoute);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log(`Server running on PORT ${PORT}`);
  } catch (error) {
    console.error('error', error);
  }
});
