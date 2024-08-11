import { Router } from "express";

import UserModel from "../models/user";
import TeacherModel from "../models/teacher";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!);
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

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await TeacherModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }
    const match = await bcrypt.compare(password, user.password!);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!);
    res
      .cookie("__auth", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ message: "Logged In" });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("__auth").json({ message: "Logged Out" });
  } catch (error) {
    next(error);
  }
});

router.get("/profile", async (req, res, next) => {
  try {
    const token = req.cookies.__auth;
    if (!token) {
      return res.status(401).json(null);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    let user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      // @ts-ignore
      user = await TeacherModel.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }
    const safeUser = { ...user.toObject() };
    delete safeUser.password;
    res.status(200).json(safeUser);
  } catch (error) {
    next(error);
  }
});

export default router;
