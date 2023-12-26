const express = require('express');
const blogRouter = express.Router();
const { getAllBlogs, addBlog, updateBlog, getById, deleBlog, getByUserId } = require('../controllers/blog-controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Specify the destination for uploaded files

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', upload.single('image'), addBlog); // Use the 'image' field name
blogRouter.put('/update/:blogId', updateBlog);
blogRouter.get('/:blogId', getById);
blogRouter.delete('/delete/:blogId', deleBlog);
blogRouter.get('/user/:userId', getByUserId);

module.exports = blogRouter;
