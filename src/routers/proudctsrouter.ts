import  Express  from "express";
import { getallproduct } from "../servcies/proudctservies";

const proudectsrouter=Express.Router()

 proudectsrouter.get('/',async(req,res)=>{
   try {
     const proudects= await getallproduct()
     res.status(200).send(proudects)
   } catch (error) {
    res.status(500).send('internal server error')
   }
})

export default proudectsrouter