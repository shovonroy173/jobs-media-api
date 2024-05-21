import { Schema, model } from "mongoose";
const blogSchema = new Schema(
  {
    userId:{ type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    author: { type: String, required: true },
    urls: [String],
    summary: { type: String },
    title2: { type: String },
    desc2: { type: String },
    title3: { type: String },
    links: [String],
    linkDetails: [{}],

  },
  { timestamps: true }
);

export default model("Blog", blogSchema);