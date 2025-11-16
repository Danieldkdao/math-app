import mongoose, { Document, Schema, Model } from "mongoose";
import { User } from "@/lib/types";

type UserSchemaType = User & Document;

const UserSchema = new Schema<UserSchemaType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, required: true },
    image: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    banned: { type: Boolean, required: true },
  });

const userModel: Model<UserSchemaType> =
  mongoose.models.User || mongoose.model("User", UserSchema, "user");

export default userModel;
