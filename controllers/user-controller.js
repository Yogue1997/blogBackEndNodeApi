const User = require('../models/User');
const bcrypt = require('bcryptjs')


//All user
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.log('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Singing Up
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Profile picture is required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture: req.file.path, // Store the path to the uploaded profile picture
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login
const login = async(req, res, next) => {
  const { email, password } = req.body;
  let existingUser

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  if (!existingUser) {
    return res.status(404).json({ message: 'Cannot find user by this email' });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

  if(!isPasswordCorrect){
    return res.status(400).json({ message: 'Incorrect Password' });
  }
  return res.status(200).json({existingUser})
}

module.exports = { getAllUsers, signup, login };

