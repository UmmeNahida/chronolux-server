
import mongoose from "mongoose";
import { IAuthProvider, isActive, Role } from "./user.interface";
const { Schema, model } = mongoose;


const authProviderScema = new Schema<IAuthProvider>({
  provider: { type: String, required: true },
  providerId: { type: String, required: true }
}, {
  _id: false,
  versionKey: false
})

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Role,
    default: Role.RIDER
  },
  isVerified: { type: Boolean, default: false },
  isActive: { type: String, enum: Object.values(isActive), default: isActive.ACTIVE },
}, {
  timestamps: true
});

export const Users = model("Users", userSchema);
