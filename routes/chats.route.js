const express = require('express');

const chatsController = require('../controllers/chats.controller');
const chatRouter = express.Router();

// send message
chatRouter.post('/send', chatsController.chatsController);
//select all messages by a user
chatRouter.get('/all/:userId', chatsController.getAllChatsController);
//save messages
chatRouter.post('/save', chatsController.saveChatsController);

module.exports = chatRouter;
