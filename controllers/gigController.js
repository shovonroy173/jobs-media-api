import Gig from "../models/Gig.js";
import User from "../models/User.js";

export const createGig = async (req, res, next) => {
  //   console.log("LINE AT 3", req.body);
  const { inputs, urls } = req.body;
  console.log(inputs, urls);
  const images = [];

  // req.files.map((item)=>{
  // images.push(item.originalname)
  // })
  try {
    const newGig = new Gig({ ...inputs, urls: urls, author: req.userId });
    const savedGig = await newGig.save();
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { gigs: savedGig._id },
    });
    res.status(200).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const searchedGig = async (req, res, next) => {

  try {
    const q = req.query.q;
    const gig = await Gig.aggregate([
      {
        $match: {
          title: { $regex: q, $options: "i" },
        },
      },
    ]).sort({ createdAt: -1 });
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const rateGig = async (req, res, next) => {
  try {
    const gig = await Gig.findByIdAndUpdate(
      req.params.id,
      { $set: { rating: req.body.rating } },
      { new: true }
    );
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const sortGigs = async (req, res, next) => {
  try {
    const gig = await Gig.find.sort({ basePrice: 1 });
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  // const {title , type} = req.params;
  // console.log(type , title);
  try {
    const gigs = await Gig.find({
      title: { $regex: req.params.title, $options: "i" },
      category: { $regex: req.params.type, $options: "i" },
    })
      .populate("author")
      .exec();
    // console.log(gigs);
    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  // const {title , type} = req.params;
  // console.log(req.params.id);
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("author")
      .populate("reviews")
      .exec();
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getInspiringGigs = async (req , res , next)=>{
  try {
    const gigs = await Gig.find({ rating: { $gt: 6 } }).populate("author").exec();
    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
}
