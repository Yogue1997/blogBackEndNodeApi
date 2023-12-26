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
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User Already Exists!' });
  }

  const hashedPassword = bcrypt.hashSync(password)

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: []
  });

  try {
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create user' });
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
  return res.status(200).json({ message: 'Login Successfull' })
}

module.exports = { getAllUsers, signup, login };

