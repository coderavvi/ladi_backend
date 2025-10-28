const { createUser, getUserDetails } = require('../database/ladi.db');

// creates a new user
async function createNewUserController(req, res) {
  // new user creation logic goes in here
  const { alias, gender, userId } = req.body;

  if (!(alias && gender && userId)) {
    return res.send({
      message: 'Alias and Gender cannot be empty',
    });
  }
  try {
    const newUser = await createUser(alias, gender, userId);
  } catch (error) {
    return res
      .status(400)
      .send({ message: error.message || 'Failed to create user' });
  }
  return res.status(201).json({ message: 'User created successfully' });
}

// retreives user information
async function retreiveUserController(req, res) {
  // user retreival logic goes in here
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: 'userId cannot be left empty' });
  }

  try {
    const userData = await getUserDetails(userId);

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(404).json({ message: error.message || 'User not found' });
  }
}

module.exports = { createNewUserController, retreiveUserController };
