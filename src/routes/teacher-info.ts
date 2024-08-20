import teacherMiddleware from "../middlewares/teacher-middleware";
import TeacherInfoModel from "../models/teacher-info";

import { Router } from "express";

const router = Router();

router.get("/", teacherMiddleware, async (req, res, next) => {
  const teacher = req.teacher;
  if (!teacher) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const teacherInfo = await TeacherInfoModel.findOne({
    teacherId: req.teacher._id,
  });
  if (!teacherInfo) {
    return res.status(404).json({ message: "Teacher info not found" });
  }
  res.json(teacherInfo);
});

router.put("/", teacherMiddleware, async (req, res, next) => {
  try {
    const teacher = req.teacher;
    const teacherInfo = await TeacherInfoModel.findOne({
      teacherId: teacher._id,
    });
    if (!teacherInfo) {
      return res.status(404).json({ message: "Teacher info not found" });
    }

    const {
      lessonPlaces,
      lessons,
      lessonPrice,
      city,
      district,
      lessonDistricts,
      imageUrl,
      videoUrl,
      about,
    } = req.body;
    
    if (lessonPlaces) teacherInfo.lessonPlaces = lessonPlaces;
    if (lessons) teacherInfo.lessons = lessons;
    if (lessonPrice) teacherInfo.lessonPrice = lessonPrice;
    if (city) teacherInfo.address.city = city;
    if (district) teacherInfo.address.district = district;
    if (lessonDistricts) teacherInfo.lessonDistricts = lessonDistricts;
    if (imageUrl) teacherInfo.photo = imageUrl;
    if (videoUrl) teacherInfo.video = videoUrl;
    if (about) teacherInfo.about = about;

    await teacherInfo.save();
    res.json(teacherInfo);
  } catch (error) {
    next(error);
  }
});

export default router;
