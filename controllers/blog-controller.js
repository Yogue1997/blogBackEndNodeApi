const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const User = require('../models/User')

//All posts
const getAllBlogs =  async(req,res,next) => {
  let blogs
  try {
    blogs = await Blog.find()
  } catch (error) {
    return console.log(error);
  }
  if(!blogs){
    return res.status(404).json({message: "No blogs Found"})
  }
  return res.status(200).json({blogs})
}


// Add posts
const addBlog = async(req,res,next) => {
  const {title, description,image,user} = req.body

  let existingUser
  try {
    existingUser = await User.findById(user)
  } catch (error) {
    console.log(error);
  }
  const blog = new Blog({
    title,
    description,
    image,
    user
  })

  if(!user) {
    return res.status(400).json({message: "Unable To find user by this ID"})
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction()
    await blog.save({session})
    existingUser.blogs.push(blog)
    await existingUser.save({session})
    await session.commitTransaction()
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error})
  }
  return res.status(200).json({blog})
}


// Update Post

const updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, description } = req.body;

  try {
    if (!blogId) {
      return res.status(400).json({ message: "Missing blogId in request parameters" });
    }

    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description
    }, { new: true });

    if (!blog) {
      return res.status(404).json({ message: `Cannot find blog with ID: ${blogId}` });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Find by ID
const getById = async(req,res,next) => {
  const { blogId } = req.params;
  let blog
  try {
    blog = await Blog.findById(blogId)
  } catch (error) {
    console.log(error);
  }
  if(!blog){
    return res.status(404).json({message: "No blog found"})
  }
  return res.status(200).json({blog})
}


// Delete

const deleBlog = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    // Find the blog and populate the 'user' field
    const blog = await Blog.findByIdAndDelete(blogId).populate('user');

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Store the user before deleting the blog
    const user = blog.user;

    // Remove the blog from the user's 'blogs' array
    user.blogs.pull(blog);

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};





module.exports ={  getAllBlogs, addBlog, updateBlog, getById, deleBlog };