import mongoose from "mongoose";

export type TUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
};

const UserSchema = new mongoose.Schema<TUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, default: "user" },
});

const UserModel = mongoose.model<TUser>("User", UserSchema);

export default UserModel;
