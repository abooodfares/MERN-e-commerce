import express from "express";

import { addnewproudct, getuseractivecard } from "../servcies/cartservies";
import valditejwt from "../middleware/jwtvaldite";

// typo fixed

const routercart = express.Router();

routercart.get("/", valditejwt, async (req: any, res) => {
 
    const userId = req.user._id;
    const activeCart = await getuseractivecard({ userid: userId });

    res.status(200).send(activeCart);
 
});
routercart.post("/", valditejwt, async (req: any, res,) => {
    const userid = req.user._id;
    const {proudctid,quantity}=req.body
    const proudct= await addnewproudct({userid,proudctid,quantity});
    res.status(proudct.statuscode).send(proudct.data)

})

export default routercart;
