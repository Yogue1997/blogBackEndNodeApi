const express = require('express');
const { getAllUsers, signup, login } = require('../controllers/user-controller');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the destination for uploaded files

router.get('/', getAllUsers);
router.post('/signup', upload.single('profilePicture'), signup); // Use the 'profilePicture' field name
router.post('/login', login);

module.exports = router;
