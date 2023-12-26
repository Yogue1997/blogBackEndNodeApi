const express = require('express');
const blogRouter = express.Router();
const { getAllBlogs, addBlog, updateBlog, getById, deleBlog, getByUserId } = require('../controllers/blog-controller')

blogRouter.get("/", getAllBlogs)
blogRouter.post("/add", addBlog)
blogRouter.put("/update/:blogId", updateBlog);
blogRouter.get("/:blogId", getById);
blogRouter.delete("/delete/:blogId", deleBlog);
blogRouter.get('/user/:userId', getByUserId)


module.exports = blogRouter

