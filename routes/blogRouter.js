import express from "express";
import { createBlog, getBlog, getBlogs } from "../controllers/blogController.js";
const router = express.Router();
router.post("/" , createBlog);
router.get("/getBlogs" , getBlogs);
router.get("/getBlog/:id" , getBlog);
export default router;  
