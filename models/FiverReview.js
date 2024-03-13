import { Schema, model } from "mongoose";

const fiverReviewSchema = new Schema({
    userId:{
        type:String , required:true
    } , 
    urls:[{
        type:String , required:true
    }] , 
    review:{
        type:String , required:true
    } , 
} , {timestamps:true});

export default model("FiverReview" , fiverReviewSchema);
