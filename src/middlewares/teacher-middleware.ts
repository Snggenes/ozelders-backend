import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import TeacherModel from "../models/teacher";

import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  email: string;
};

async function teacherMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.__auth;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const teacher = await TeacherModel.findOne({ email: decoded.email });
    if (teacher) {
      req.teacher = teacher;
      return next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default teacherMiddleware;