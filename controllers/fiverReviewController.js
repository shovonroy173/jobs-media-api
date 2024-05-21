import FiverReview from "../models/FiverReview.js";

export const createReview = async(req , res , next)=>{
try {
    const newReview = new FiverReview({review:req.body.inputs.review , ...req.body});
    const savedReview = newReview.save();
    res.status(200).json(savedReview);
} catch (error) {
    next(error);
}
};

export const getReviews = async(req , res , next)=>{
    try {
        const reviews = await FiverReview.find().populate("userId").exec();
        res.status(200).send(reviews);
    } catch (error) {
        next(error);
    }
    };