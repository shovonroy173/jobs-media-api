import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const verifyToken = async(req , res , next)=>{
    console.log(req.body.userId);
    const user = await User.findById(req.body.userId);
    if(!user.token){
        return next(401 , "You are not authenticated!!");
    }else{
        jwt.verify(user.token , process.env.JWT , (err , user)=>{
            if(err){
                console.log(err);
               return  next(403 , "Forbidden");
            }
            else{
                req.userId = user._id
                // console.log(user);
                next()
            }
        })
    }

};


