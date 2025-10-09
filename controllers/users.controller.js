const toNumericId = require('../services/services');
const { signUp } = require('../supabase/ladi_db');

async function UserController(req, res) {
  try {
    const { alias, gender } = req.body;

    //   validate user input
    if (!(alias && gender)) {
      return res
        .status(400)
        .json({ error: 'Alias and Date of birth not entered' });
    }

    //add user to database
    const newUser = await signUp(
      alias,
      gender,
      toNumericId(new Date().toISOString())
    );

    return res.status(200).json({ message: 'user created ' });
  } catch (err) {
    console.error({ message: 'Failed to create new user' });
  }

  return console.log(newUser);
}

module.exports = UserController;
