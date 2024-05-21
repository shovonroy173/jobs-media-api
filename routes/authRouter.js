import express from "express";
import { addToWishlist, getPaidGigs, getUser, login, register} from "../controllers/authController.js";
import {verifyToken} from "../utils/verifytoken.js"

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.get("/user/:id" , getUser);
router.get("/getByPaidGigs/:id" , getPaidGigs);
router.post("/addToWishlist/:id" , verifyToken ,  addToWishlist);
// router.post("/sendlink" , sendLink);
// router.put("/resetpassword/:id/:token" , resetPassword);

export default router;  