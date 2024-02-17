const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./database/db');

const express = require('express');
const userRoute = require('./routes/user.route');

const app = express();
const PORT = 3000;

// json
app.use(express.json());

// routes
app.use('/users', userRoute);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log(`Server running on PORT ${PORT}`);
  } catch (error) {
    console.error('error', error);
  }
});
