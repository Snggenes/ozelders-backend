import mongoose from "mongoose";

export type TLesson = {
    _id: string;
    label: string;
}

const LessonSchema = new mongoose.Schema<TLesson>({
    label: { type: String, required: true },
});

const LessonModel = mongoose.model<TLesson>("Lesson", LessonSchema);

export default LessonModel;