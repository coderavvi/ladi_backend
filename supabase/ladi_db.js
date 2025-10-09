require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

//creating a new user

async function signUp(alias, gender, userId) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        userId,
        alias,
        gender,
      },
    ])
    .select();
  if (error) {
    return console.log(error.message || 'Failed to create new user');
  }

  return data[0];
}

//sending a message
async function sendMessage(userId, message, role, time_sent) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ userId, message, role, time_sent }])
    .select();

  if (error) {
    return console.log(error.message || 'Failed to send message');
  }

  return data[0];
}

//retreiving all messages
async function getUserMessages(userId) {
  console.log('trying to retreive Message');

  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('userId', userId);

  if (error) {
    return console.log(
      error.message || "Failed to retreive this user's messages"
    );
  }
  return data;
}

// saving user and agent's message
async function saveMessages(userId, role, message, time_sent) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ userId, message, role, time_sent }])
    .select();

  if (error) {
    return console.log(error.message || 'Failed to save message');
  }

  return data[0];
}

module.exports = { signUp, sendMessage, getUserMessages, saveMessages };
