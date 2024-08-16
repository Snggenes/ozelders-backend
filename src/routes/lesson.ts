import LessonModel from "../models/lesson";

import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  const search = req.query.search as string;

  try {
    if (search) {
      const lessons = await LessonModel.find({
        label: { $regex: search, $options: "i" },
      }).limit(10);
      const lessonArray = lessons.map((lesson) => lesson.label);

      res.status(200).json(lessonArray);
      return;
    }

    const lessons = await LessonModel.find().limit(10);
    const lessonArray = lessons.map((lesson) => lesson.label);

    res.status(200).json(lessonArray);
  } catch (error) {
    next(error);
  }
});

export default router;
