import mongoose, { Document, Schema, Model } from "mongoose";
import { ChatSession, Chat } from "@/lib/types";

type ChatSessionSchemaType = ChatSession & Document;

const ChatSchema = new Schema<Chat>({
  role: { type: String, required: true, enum: ["user", "assistant"] },
  content: { type: String, required: true },
});

const ChatSessionSchema = new Schema<ChatSessionSchemaType>(
  {
    chats: { type: [ChatSchema], required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const chatSessionModel: Model<ChatSessionSchemaType> = mongoose.models.ChatSessions || mongoose.model("ChatSessions", ChatSessionSchema, "chat-sessions");

export default chatSessionModel;
