import mongoose from "mongoose";

export type TLessonPlace = {
  _id: string;
  label: string;
};

const LessonPlaceSchema = new mongoose.Schema<TLessonPlace>({
  label: { type: String, required: true },
});

const LessonPlaceModel = mongoose.model<TLessonPlace>(
  "LessonPlace",
  LessonPlaceSchema
);

export default LessonPlaceModel;
