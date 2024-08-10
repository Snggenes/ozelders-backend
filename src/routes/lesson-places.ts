import LessonPlaceModel from "../models/lesson-places";

import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const lessonPlaces = await LessonPlaceModel.find();

    res.status(200).json(lessonPlaces);
  } catch (error) {
    next(error);
  }
});

export default router;
