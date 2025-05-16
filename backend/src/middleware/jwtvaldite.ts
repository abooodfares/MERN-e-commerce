import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usermodel from "../models/users";
import dotenv from 'dotenv';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const valditejwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const JWT = "asdkfcckdxcovekdcoekcovcke3ppss" 
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

  jwt.verify(token, JWT || "", async (error, payload) => {
    if (error) {
      res.status(403).send(`Invalid token: ${error.message}`);
      return;
    }

    if (!payload) {
      res.status(403).send("Invalid token: No payload");
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
