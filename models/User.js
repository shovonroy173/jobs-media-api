import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: {
      type: String,
    },
    level: {
      type: String,
      default:0
    },
    country: {
      type: String,
    },
    lang: {
      type: String,
    },
    desc: {
      type: String,
    }, 
    summary:{
      type: String,
    } , 
    respTime: {
      type: String,
    },
    specialization: {
      type: Array,
    },
   
    wishlist:[String] , 
    gigs: [{
      type: Schema.Types.ObjectId,
      ref: "Gig",
    }],
    token:{
      type:String , 
      default:""
    }
  },
  { timestamps: true }
);

export default model("User", userSchema);
