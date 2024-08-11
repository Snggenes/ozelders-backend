import { Router } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import TeacherModel from "../models/teacher";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      city,
      district,
      lessons,
      lessonPlaces,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phone ||
      !city ||
      !district ||
      !lessons ||
      !lessonPlaces
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingTeacher = await TeacherModel.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new TeacherModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      address: { city, district },
      lessons,
      lessonPlaces,
    });

    await teacher.save();

    const token = jwt.sign({ email: teacher.email }, process.env.JWT_SECRET!);
    res
      .cookie("__auth", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ message: "Registered and logged in" });
  } catch (error) {
    next(error);
  }
});

export default router;
