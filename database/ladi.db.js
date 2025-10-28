const { createClient } = require('@supabase/supabase-js');
const isoToNumericId = require('../services/utils');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// retrieve chats from the database
async function getAllChats(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('userId', userId);

  if (error) {
    console.log(error.message || 'Failed to retreive chats form the database');
    return [];
  }
  return data || [];
}

// save chats into database
async function saveChats(userId, role, message) {
  const { error } = await supabase.from('messages').insert([
    {
      userId: userId,
      role: role,
      content: message,
      timestamp: isoToNumericId(new Date().toISOString()),
    },
  ]);

  if (error) {
    console.log(error.message || 'Failed to save Message to the database');
    return;
  }
  console.log('Chats saved succesfully');
  return;
}

// insert new user details into the database
async function createUser(alias, gender, userId) {
  const { error } = await supabase.from('users').insert([
    {
      alias,
      gender,
      userId,
    },
  ]);

  if (error) {
    console.log(error.message || 'Failed to create new user');
    return;
  }
  return;
}

// retrieve user Information from the database
async function getUserDetails(userId) {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('userId', userId);

  if (error) {
    return console.log(
      error.message || "Failed to retreive user's information"
    );
  }

  console.log(data);

  return data;
}

module.exports = { getAllChats, saveChats, createUser, getUserDetails };
