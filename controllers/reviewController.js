import Gig from "../models/Gig.js";
import Review from "../models/Review.js";


export const createReview = async(req , res , next)=>{
    // console.log(req.body);
    const {id , userId} = req.body;
    try {
        const newReview = new Review({
            userId:userId , 
            gigId:id ,  
            ...req.body
        });
        const savedReview = await newReview.save();
        await Gig.findByIdAndUpdate(id , {
            $addToSet:{reviews:savedReview._id}
        } , {new:true})
        res.status(200).json(savedReview);
    } catch (error) {
        next(error);
    }
};

export const getReviews = async(req , res , next)=>{
    // console.log(req.params.id);
    try {
        const reviews = await Review.find({gigId:req.params.id}).sort({createdAt:-1});
        res.status(200).json(reviews);
    } catch (error) {
        next(error)
    }
}