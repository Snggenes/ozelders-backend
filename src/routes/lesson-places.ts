import LessonPlaceModel from "../models/lesson-places";

import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const lessonPlaces = await LessonPlaceModel.find();
    const places = lessonPlaces.map((lessonPlace) => lessonPlace.label);
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
});

export default router;
