import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usermodel from "../models/users";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const valditejwt =  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("No authorization header provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Token not found");
    return;
  }

  jwt.verify(token, "asdkfcckdxcovekdcoekcovcke3ppss", async (error, payload) => {
    if (error || !payload) {
    res.status(403).send("Invalid token");
      return;
    }

    const userPayload = payload as any;
    const user = await Usermodel.findOne({ email: userPayload.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  });
};

export default valditejwt;
