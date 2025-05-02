import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usermodel from "../models/users";
import dotenv from 'dotenv';
export interface AuthenticatedRequest extends Request {
  user?: any;
}

const valditejwt =  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const JWT= "asdkfcckdxcovekdcoekcovcke3ppss" 
  console.log("🔒 JWT Validation Started");
  console.log("Request Headers:", req.headers);
  
  const authorizationHeader = req.get("authorization");
  console.log("📝 Authorization Header:", authorizationHeader);

  if (!authorizationHeader) {
    console.log("❌ No Authorization Header");
    res.status(403).send("No authorization header provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  console.log("🔑 Extracted Token:", token);

  if (!token) {
    console.log("❌ No Token Found in Header");
    res.status(403).send("Token not found");
    return;
  }

  console.log("🔐 JWT Secret:", JWT ? "Secret is set" : "Secret is missing!");

  jwt.verify(token, JWT || "", async (error, payload) => {
    if (error) {
      console.log("❌ JWT Verification Error:", {
        name: error.name,
        message: error.message
      });
      res.status(403).send(`Invalid token: ${error.message}`);
      return;
    }

    if (!payload) {
      console.log("❌ No Payload in Token");
      res.status(403).send("Invalid token: No payload");
      return;
    }

    console.log("✅ Token Verified Successfully");
    console.log("📦 Token Payload:", payload);

    const userPayload = payload as any;
    console.log("🔍 Looking for user with email:", userPayload.email);

    const user = await Usermodel.findOne({ email: userPayload.email });
    console.log("👤 User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).send("User not found");
    }

    console.log("✅ Authentication Successful");
    req.user = user;
    next();
  });
};

export default valditejwt;
