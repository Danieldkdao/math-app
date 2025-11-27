import mongoose, { Document, Schema, Model } from "mongoose";
import { Thread, ThreadReply, Author } from "@/lib/types";
import { threadCategories } from "@/lib/utils";
import "@/db/schemas/user-model";

type ThreadSchemaType = Thread & Document;

export const AuthorSchema = new Schema<Author>(
  {
    name: { type: String, required: true },
    image: { type: String },
    id: { type: String, required: true },
  },
  { _id: false }
);

export const ThreadReplySchema = new Schema<ThreadReply>(
  {
    author: { type: AuthorSchema, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const ThreadSchema = new Schema<ThreadSchemaType>(
  {
    title: { type: String, required: true },
    threadPrompt: { type: String, required: true },
    startedBy: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, requied: true, enum: threadCategories },
    replies: { type: [ThreadReplySchema], required: true },
  },
  { timestamps: true }
);

const threadModel: Model<ThreadSchemaType> =
  mongoose.models.Thread || mongoose.model("Thread", ThreadSchema, "threads");

export default threadModel;
