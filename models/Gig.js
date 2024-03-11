import { Schema, model } from "mongoose";
const gigSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    urls: [String],
    popular: { type: Boolean },
    rating: {
      type: Number,
      default: 1,
    },
    basePrice: [Number],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews:[{
      type: Schema.Types.ObjectId , 
      ref:"Review"
    }]
  },
  { timestamps: true }
);

export default model("Gig", gigSchema);
