import mongoose from "mongoose";

export type TUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
};

const UserSchema = new mongoose.Schema<TUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
});

const UserModel = mongoose.model<TUser>("User", UserSchema);

export default UserModel;
