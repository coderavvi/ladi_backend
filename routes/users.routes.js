const express = require('express');
const {
  createNewUserController,
  retreiveUserController,
} = require('../controllers/users.controller');

const UsersRouter = express.Router();

// create new user
UsersRouter.post('/new', createNewUserController);

// Retreive user info
UsersRouter.get('/:userId', retreiveUserController);

module.exports = UsersRouter;
