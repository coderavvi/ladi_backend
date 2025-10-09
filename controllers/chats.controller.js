const openAI = require('openai');
const { getUserMessages, saveMessages } = require('../supabase/ladi_db');
require('dotenv').config();

const openai = new openAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatsController(req, res) {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'message cannot be empty' });
    }

    //  handle chats
    try {
      const messages = [
        {
          role: 'system',
          content: `Your name is Ladi. You are a compassionate and supportive mental health assistant. Your role is to:
          - Listen actively and empathetically
          - Provide emotional support and validation
          - Encourage healthy coping strategies
- Never diagnose or replace professional help
- Suggest professional help when appropriate
- Keep responses concise and supportive

Remember: You're here to support, not to diagnose or treat.`,
        },
        {
          role: 'user',
          content: message,
        },
        ...history.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_completion_tokens: 500,
      });

      const aiResponse = response.choices[0].message.content;

      return res.json({
        assistant: aiResponse,
        role: 'assistant',
      });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: 'failed to send message to openAi',
    });
  }
}

// get all chat
async function getAllChatsController(req, res) {
  console.log(req);

  const { userId } = req.params;

  // fetch all chats based on userId
  const userChatHistory = await getUserMessages(userId);
  console.log(userChatHistory);

  return res.json(userChatHistory);
}

async function saveChatsController(req, res) {
  const { userId, role, message } = req.body;

  //send messages into the database
  try {
    await saveMessages(userId, role, message, new Date().toISOString());
  } catch (error) {
    return res.status(400).json(error.message || 'Failed to save Message');
  }
  return res.status(200).json({ message: 'Message saved Sucessfully' });
}

module.exports = {
  chatsController,
  getAllChatsController,
  saveChatsController,
};
