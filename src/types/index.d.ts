import UserModel from "../models/user";
import TeacherModel from "../models/teacher";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
      teacher?: TeacherModel;
    }
  }
}
