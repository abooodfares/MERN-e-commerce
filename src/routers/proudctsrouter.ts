import  Express  from "express";
import { getallproduct } from "../servcies/proudctservies";

const proudectsrouter=Express.Router()

 proudectsrouter.get('/',async(req,res)=>{
    const proudects= await getallproduct()
    res.status(200).send(proudects)
})

export default proudectsrouter