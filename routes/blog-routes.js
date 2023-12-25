const express = require('express');
const blogRouter = express.Router();
const { getAllBlogs, addBlog, updateBlog, getById, deleBlog } = require('../controllers/blog-controller')

blogRouter.get("/", getAllBlogs)
blogRouter.post("/add", addBlog)
blogRouter.put("/update/:blogId", updateBlog);
blogRouter.get("/:blogId", getById);
blogRouter.delete("/delete/:blogId", deleBlog);


module.exports = blogRouter

