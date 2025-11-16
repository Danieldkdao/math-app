import { PuzzleSession, SessionPuzzle, UserSettings } from "@/lib/types";
import { mathPuzzleCategories } from "@/lib/utils";
import mongoose, { Document, Schema, Model } from "mongoose";

type PuzzleSessionSchemaType = PuzzleSession & Document;

const UserSettingsSchema = new Schema<UserSettings>(
  {
    selectedCategories: { type: [String], enum: mathPuzzleCategories },
    timeLimitPerPuzzle: { type: Number },
    hints: { type: Boolean, required: true },
    skips: { type: Boolean, required: true },
    numberOfPuzzles: { type: Number, required: true },
  },
  { _id: false }
);

const SessionPuzzleSchema = new Schema<SessionPuzzle>(
  {
    puzzleId: { type: Schema.Types.ObjectId, ref: "MathPuzzles" },
    userAnswer: { type: Number },
    result: { type: String, enum: ["correct", "incorrect", "skipped"] },
    timeSpent: { type: Number, required: true },
  },
  { _id: false }
);

const PuzzleSessionSchema = new Schema<PuzzleSessionSchemaType>(
  {
    settings: { type: UserSettingsSchema, required: true },
    user: { type: String, required: true },
    puzzleHistory: { type: [SessionPuzzleSchema], required: true },
  },
  { timestamps: true }
);

const puzzleSessionModel: Model<PuzzleSessionSchemaType> = mongoose.models.PuzzleSessions || mongoose.model("PuzzleSessions", PuzzleSessionSchema, "puzzle-sessions");

export default puzzleSessionModel;
