import  Stripe from "stripe";
import User from "../models/User.js";
const stripe = new Stripe("sk_test_51N55v0SG4487ZVYHPGAAx9068xxjQu6YzDjUJX4u6MRPCxqGWBvUbAKbBRHXVX26ahTp2vMOwgY287c0NKhDbuv700Tq9HPoMK");
export const payment = async(req , res)=>{
    await User.findByIdAndUpdate(req.body.userId , {
        $addToSet:{paidGigs:req.body.id}
    } , {new:true});
    // console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"] , 
        line_items:[{
            price_data:{
                currency:"inr" , 
                product_data:{
                    name:req.body.paymentDetails.name , 
                     
                } , 
                unit_amount: req.body.paymentDetails.price*100
            } , 
            quantity:1
        }] , 
        mode:"payment" , 
        success_url:`http://localhost:5173/user` , 
        cancel_url:`http://localhost:5173/failure`
    });
    res.json({id:session.id});
};

