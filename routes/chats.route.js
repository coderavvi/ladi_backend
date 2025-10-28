const express = require('express');
const {
  sendMessagesController,
  getUserChatsController,
  saveChatsController,
} = require('../controllers/chats.controller');

const ChatsRouter = express.Router();

// send chats router
ChatsRouter.post('/send', sendMessagesController);

// retreive chats
ChatsRouter.get('/:userId', getUserChatsController);

// save chats
ChatsRouter.post('/save', saveChatsController);

module.exports = ChatsRouter;
