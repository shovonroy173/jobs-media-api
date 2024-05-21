import express from "express";
import { createReview, getReviews } from "../controllers/fiverReviewController.js";
const router = express.Router();

router.post("/" , createReview);
router.get("/getReviews" , getReviews);

export default router;