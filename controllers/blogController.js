import Blog from "../models/Blog.js";

export const createBlog = async (req, res, next) => {
  const { inputs, userId, urls, links, linkDetails } = req.body;
  console.log(inputs, userId, urls, links, linkDetails);
  try {
    const newBlog = new Blog({ ...inputs, userId: userId, ...req.body });
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
      
    // console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const getBlog = async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id);
        
      // console.log(gigs);
      res.status(200).json(blog);
    } catch (error) {
      next(error);
    }
  };
