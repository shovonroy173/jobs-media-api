import express from "express";
import { payment } from "../controllers/paymentController.js";
import {verifyToken} from "../utils/verifytoken.js";
const router = express.Router();

router.post("/payment" , verifyToken ,  payment);

export default router;
