import  Express from "express";
import { Login, Register } from "../servcies/userservies";

const router = Express.Router();

router.post('/register', async (req, res) => {
    try {
      const user = await Register(req.body);
      res.status(user.statuscode).send(
          {
        "data":  user.data
      }
  
      )
    } catch (error) {
      res.status(500).send('internal server error')
    }
})
router.post('/login', async (req, res) => {
   try {
     const user = await Login(req.body);
     res.status(user.statuscode).send(
         {
       "data":  user.data
     }
 
     )
   } catch (error) {
     res.status(500).send('internal server error')
   }
})
export default router