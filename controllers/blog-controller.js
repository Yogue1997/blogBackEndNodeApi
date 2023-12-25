const Blog = require('../models/Blog')


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

  const blog = new Blog({
    title,
    description,
    image,
    user
  })

  try {
    await blog.save()
  } catch (error) {
    return console.log(error);
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

const deleBlog = async (req,res,next) => {
  const { blogId } = req.params;
  let blog
  try {
    blog = await Blog.findByIdAndDelete(blogId)
  } catch (error) {
    console.log(error);
  }
  if(!blog){
    return res.status(500).json({message: "Unable to delete"})
  }
  return res.status(200).json({message: "Successfully deleted"})
}





module.exports ={  getAllBlogs, addBlog, updateBlog, getById, deleBlog };