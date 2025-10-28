const openAI = require('openai');
require('dotenv').config();

const openai = new openAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatCompletions(message, history) {
  // constructing the prompt
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
    ...history?.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  // chat completions
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.7,
    max_completion_tokens: 500,
  });

  return response.choices[0].message.content;
}

module.exports = chatCompletions;
