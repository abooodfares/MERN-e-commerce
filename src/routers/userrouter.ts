import  Express from "express";
import { Login, Register } from "../servcies/userservies";

const router = Express.Router();

router.post('/register', async (req, res) => {
    const user = await Register(req.body);
    res.status(user.statuscode).send(
        {
      "data":  user.data
    }

    )
})
router.post('/login', async (req, res) => {
    const user = await Login(req.body);
    res.status(user.statuscode).send(
        {
      "data":  user.data
    }

    )
})
export default router