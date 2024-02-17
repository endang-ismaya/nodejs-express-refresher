const express = require('express');
const app = express();
const userRoute = require('./routes/user.route');
const PORT = 3000;

// json
app.use(express.json());

// routes
app.use('/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
