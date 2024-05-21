import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer"
dotenv.config();

const app = express();

import authRouter from "./routes/authRouter.js"
import gigRouter from "./routes/gigRouter.js"
import reviewRouter from "./routes/reviewRouter.js"
import paymentRouter from "./routes/paymentRouter.js"
import fiverReviewRouter from "./routes/fiverReviewRouter.js"
import blogRouter from "./routes/blogRouter.js"


app.use(cors({origin:"*"}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"))
app.use(express.static("uploads"))

mongoose.connect(process.env.MONGO_URI).then(()=>(console.log("Connected to Database!"))).catch(()=>("Not Connected to Database!"));

const upload = multer({dest:"uploads/"});
app.use("/api/auth" , authRouter);
app.use("/api/gig" ,  gigRouter);
app.use("/api/checkout" ,  paymentRouter);
app.use("/api/review" , reviewRouter);
app.use("/api/fiverReview" , fiverReviewRouter);
app.use("/api/blog" , blogRouter);

// app.post("/api/gig" , upload.array("images" , 10) ,  (req , res)=>{
//     console.log(req.files);
//     res.send("ok")
// });
// app.use("/api/payment" , paymentRouter);


app.use((err , req, res , next)=>{
    console.log("LINE AT  21 INDEX" , err);
    const errorStatus = err.status || 500;
    const errorStack = err.stack;
    const errorMessage = err.message || "Something broke!!";
    res.status(errorStatus).json({
        success:false , 
        status : errorStatus , 
        message : errorMessage ,  
        stack : errorStack
    });
});

app.listen(5000 , ()=>{
    try {
        console.log("Connected to Server!");
    } catch (error) {
        console.log(error);
    }
})