const express = require('express');
const cors = require('cors');
require('dotenv').config();

const UsersRouter = require('./routes/users.routes');
const ChatsRouter = require('./routes/chats.route');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

const PORT = process.env.PORT;

// chat management
app.use('/chats', ChatsRouter);

// user management
app.use('/users', UsersRouter);

// starting up the server
app.listen(PORT, '0.0.0.0', (err) => {
  console.log(`Server listening on port ${PORT}`);

  if (err) {
    console.log(err.message || 'Unable to start server');
  }
});
