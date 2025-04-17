import express from "express";

import { getuseractivecard } from "../servcies/cartservies";
import valditejwt from "../middleware/jwtvaldite";

// typo fixed

const routercart = express.Router();

routercart.get("/", valditejwt, async (req: any, res) => {
 
    const userId = req.user._id;
    const activeCart = await getuseractivecard({ userid: userId });

    res.status(200).send(activeCart);
 
});

export default routercart;
