import { PuzzleSession, SessionPuzzle, UserSettings } from "@/lib/types";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";
import mongoose, { Document, Schema, Model } from "mongoose";
import "@/db/schemas/math-puzzle-model";

type PuzzleSessionSchemaType = PuzzleSession & Document;

const UserSettingsSchema = new Schema<UserSettings>(
  {
    selectedDifficultyLevels: {
      type: [String],
      required: true,
      enum: mathPuzzleDifficultyLevels,
    },
    selectedCategories: {
      type: [String],
      required: true,
      enum: mathPuzzleCategories,
    },
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
    userAnswer: { type: String },
    result: { type: String, enum: ["correct", "incorrect", "skipped"] },
    timeSpent: { type: Number, required: true },
    hintUsed: { type: Boolean, required: true },
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

const puzzleSessionModel: Model<PuzzleSessionSchemaType> =
  mongoose.models.PuzzleSessions ||
  mongoose.model("PuzzleSessions", PuzzleSessionSchema, "puzzle-sessions");

export default puzzleSessionModel;
