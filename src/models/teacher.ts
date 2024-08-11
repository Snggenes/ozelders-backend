import mongoose from "mongoose";

export type TAddress = {
  city: string;
  district: string;
};

export type TTeacher = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  address: TAddress;
  lessons: string[];
  lessonPlaces: string[];
  lessonDistricts: string[];
  photo?: string;
  video?: string;
  dateOfBirth: Date;
  about: string;
  lessonPrice: number;
  reviews: string[];
};

const TeacherSchema = new mongoose.Schema<TTeacher>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    district: { type: String, required: true },
  },
  lessons: [{ type: String, required: true }],
  lessonPlaces: [{ type: String, required: true }],
  lessonDistricts: [{ type: String, required: true }],
  photo: { type: String, default: "" },
  video: { type: String, default: "" },
  dateOfBirth: { type: Date, required: true },
  about: { type: String, required: true },
  lessonPrice: { type: Number, required: true },
  reviews: [{ type: String, default: [] }],
});

const TeacherModel = mongoose.model<TTeacher>("Teacher", TeacherSchema);

export default TeacherModel;
