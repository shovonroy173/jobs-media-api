import Gig from "../models/Gig.js";
import User from "../models/User.js";

export const createGig = async (req, res, next) => {
  //   console.log("LINE AT 3", req.body);
  const { inputs, urls } = req.body;
  // console.log(inputs, urls);
  const images = [];

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
    const title = req.body.title;
    const category = req.body.category;
    const gig = await Gig.aggregate([
      {
        $match: {
          title: { $regex: q, $options: "i" },
        },
      },
    ] , {
      $or: [
        { title: { $regex: title, $options: "i" } },
        { category: { $regex: category, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });
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
  const type = req.params.type;
  let gig;
  try {
    switch (req.params.val) {
      case "old":
        gig = await Gig.find({
          $or: [
            { title: { $regex: type, $options: "i" } },
            { category: { $regex: type, $options: "i" } }
          ]
        }).sort({ createdAt: 1 });

        break;
      case "new":
        gig = await Gig.find({
          $or: [
            { title: { $regex: type, $options: "i" } },
            { category: { $regex: type, $options: "i" } }
          ]
        }).sort({ createdAt: -1 });
        break;
      case "popular":
        gig = await Gig.find({
          $or: [
            { title: { $regex: type, $options: "i" } },
            { category: { $regex: type, $options: "i" } }
          ]
        } , { popular: true });
        break;
      case "high":
        const sortQuery = {};
        sortQuery[`basePrice.0`] = -1;
        gig = await Gig.find({
          $or: [
            { title: { $regex: type, $options: "i" } },
            { category: { $regex: type, $options: "i" } }
          ]
        }).sort(sortQuery);
        break;
      case "low":
        const sortQuerylow = {};
        sortQuerylow[`basePrice.0`] = 1;
        gig = await Gig.find({
          $or: [
            { title: { $regex: type, $options: "i" } },
            { category: { $regex: type, $options: "i" } }
          ]
        }).sort(sortQuerylow);
        break;
      case "rated":
        gig = await Gig.find({
          $or: [
            { title: { $regex: type, $options: "i" } },
            { category: { $regex: type, $options: "i" } }
          ]
        } , { rating: { $gt: 6 } });
        break;
      default:
        console.log("I do not know this fruit.");
    }
    res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {

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

export const getGigsTypes = async (req, res, next) => {
  // console.log(req.params.type);
  try {
    const gigs = await Gig.find({
      
      category: { $regex: req.params.type, $options: "i" },
    })
      .populate("author")
      .exec();
    // console.log(gigs);
    res.status(200).json(gigs);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getGig = async (req, res, next) => {
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

export const getInspiringGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find({ rating: { $gt: 6 } })
      .populate("author")
      .exec();
    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};
