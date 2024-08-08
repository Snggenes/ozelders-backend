import LessonModel from "../models/lesson";

import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  const search = req.query.search as string;

  try {
    if (search) {
      const lessons = await LessonModel.find({
        label: { $regex: search, $options: "i" },
      });
      res.status(200).json(lessons);
      return;
    }

    const lessons = await LessonModel.find();

    res.status(200).json(lessons);
  } catch (error) {
    next(error);
  }
});

export default router;
