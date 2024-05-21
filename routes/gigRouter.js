import express from "express";
import { verifyToken } from "../utils/verifytoken.js";
import { createGig, getGig, getGigs, getGigsTypes, getInspiringGigs, searchedGig, sortGigs } from "../controllers/gigController.js";
const router = express.Router();

router.post("/" , verifyToken ,  createGig);
router.get("/getGigsByTypes/:title/:type" , getGigs);
router.get("/getGigsByCategories/:type" , getGigsTypes);
router.get("/getGigById/:id" , getGig);
router.get("/getSearchGig/gigs" , searchedGig);
router.get("/getInspiringGigs" , getInspiringGigs);
router.get("/getSortFilter/:val/:type" , sortGigs);
 
export default router;
