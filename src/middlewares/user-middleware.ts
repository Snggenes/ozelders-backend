import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  email: string;
};

async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.__auth;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await UserModel.findOne({ email: decoded.email });
    if (user) {
      req.user = user;
      return next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default userMiddleware;