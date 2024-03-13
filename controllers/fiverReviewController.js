import FiverReview from "../models/FiverReview.js";

export const createReview = async(req , res , next)=>{
try {
    const newReview = new FiverReview({review:req.body.inputs.review , ...req.body});
    const savedReview = newReview.save();
    res.status(200).json(savedReview);
} catch (error) {
    next(error);
}
}