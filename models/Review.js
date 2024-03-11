import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId , required:true , 
        ref:"User" , 
    } , 
    userName : {
        type:String , required:true

    } , 
    userCountry :{
        type:String

    } , 
    userLevel:{
        type:String , required:true

    } , 
    gigId:{
        type:String , required:true
    } , 
    text:{
        type:String , required:true
    } , 
} , {timestamps:true});

export default model("Review" , reviewSchema);