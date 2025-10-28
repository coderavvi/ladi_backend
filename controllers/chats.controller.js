const { getAllChats, saveChats } = require('../database/ladi.db');
const chatCompletions = require('../services/prompt');

// send chats
async function sendMessagesController(req, res) {
  // chat sending logic goes here
  const { userId, message, history } = req.body;

  if (!message) {
    return res.status(400).send({ message: 'Message cannot be empty' });
  }
  // save user  chats to the database
  try {
    await saveChats(userId, 'user', message);

    // process AI message
    const agentResponse = await chatCompletions(message, history);

    //save ai agent's chat to the database
    await saveChats(userId, 'assistant', agentResponse);

    return res.status(200).send({ content: agentResponse, role: 'assistant' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// Retrieve Chats
async function getUserChatsController(req, res) {
  // chat retreival logic goes here
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({ message: 'userId cannot be empty' });
  }

  try {
    const chats = await getAllChats(userId);
    res.status(200).json(chats);
    return;
  } catch (error) {
    return res.status(404).send({
      error: error.message || 'Failed to retreive chats for this user',
    });
  }
}

// save Chats
async function saveChatsController(req, res) {
  // chat saving logic goes in here
  const { userId, role, message } = req.body;

  if (!(userId && message && role)) {
    return res
      .status(400)
      .send({ message: 'userId, role and message must be provided' });
  }

  try {
    const chats = await saveChats(userId, role, message);
    return res.status(200).send({ message: 'Message saved successfully' });
  } catch (error) {
    return res
      .status(400)
      .send({ error: error.message || 'Failed to save chats' });
  }
}

module.exports = {
  sendMessagesController,
  getUserChatsController,
  saveChatsController,
};
