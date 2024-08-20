import mongoose from "mongoose";
import type { TTeacherInfo } from "./teacher-info";

export type TAddress = {
  city: string;
  district: string;
};

export type TTeacher = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone: string;
  dateOfBirth: Date;
  role: string;
};

const TeacherSchema = new mongoose.Schema<TTeacher>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  role: { type: String, default: "teacher" },
});

const TeacherModel = mongoose.model<TTeacher>("Teacher", TeacherSchema);

export default TeacherModel;
