import mongoose from "mongoose";

export type TAddress = {
  city: string;
  district: string;
};

export type TTeacherInfo = {
    teacherId: string;
    address: TAddress;
    lessons: string[];
    lessonPlaces: string[];
    lessonDistricts: string[];
    photo: string;
    video: string;
    about: string;
    lessonPrice: number;
    reviews: string[];
};

const TeacherInfoSchema = new mongoose.Schema<TTeacherInfo>({
    teacherId: { type: String, required: true },
    address: {
        city: { type: String, default: "" },
        district: { type: String, default: "" },
      },
    lessons: [{ type: String, default: [] }],
    lessonPlaces: [{ type: String, default: [] }],
    lessonDistricts: [{ type: String, default: [] }],
    photo: { type: String, default: "" },
    video: { type: String, default: "" },
    about: { type: String, default: "" },
    lessonPrice: { type: Number, default: 0 },
    reviews: [{ type: String, default: [] }],
});

TeacherInfoSchema.index({ teacherId: 1 }, { unique: true });

const TeacherInfoModel = mongoose.model<TTeacherInfo>("TeacherInfo", TeacherInfoSchema);

export default TeacherInfoModel;
