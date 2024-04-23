import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    img: {
      type: String,
    },
    paidGigs:[{
      type: Schema.Types.ObjectId,
      ref: "Gig",
    }] , 
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
   
    wishlist:[{
      type: Schema.Types.ObjectId,
      ref: "Gig",
    }] , 
    gigs: [{
      type: Schema.Types.ObjectId,
      ref: "Gig",
    }],
    serviceProvider:{
      type: Boolean , 
      default: false
    } , 
    services:{
      type: [String] , 
     default:[""]
    } , 
    token:{
      type:String , 
      default:""
    }
  },
  { timestamps: true }
);

export default model("User", userSchema);
