import type { Attempt, Flag, MathCommunityPuzzle, Rating } from "@/lib/types";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";
import mongoose, { Document, Schema, Model } from "mongoose";
import { AuthorSchema, ThreadReplySchema } from "./thread-model";

type CommunityPuzzleSchemaType = MathCommunityPuzzle & Document;

const RatingSchema = new Schema<Rating>(
  {
    user: { type: String, required: true, unique: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
  },
  { _id: false }
);

const FlagSchema = new Schema<Flag>(
  {
    user: { type: String, required: true, unique: true },
    reason: { type: String, required: true },
  },
  { _id: false }
);

const AttemptSchema = new Schema<Attempt>({
  user: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
  result: { type: String, required: true, enum: ["correct", "incorrect"] },
});

const CommunityPuzzleSchema = new Schema<CommunityPuzzleSchemaType>(
  {
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: mathPuzzleDifficultyLevels,
      required: true,
    },
    category: { type: String, enum: mathPuzzleCategories, required: true },
    problemText: { type: String, required: true },
    answers: { type: [String], required: true },
    hint: { type: String, required: true },
    solutionOutline: { type: String, required: true },
    user: { type: AuthorSchema, required: true },
    ratings: { type: [RatingSchema], default: [], required: true },
    flags: { type: [FlagSchema], default: [], required: true },
    comments: { type: [ThreadReplySchema], default: [], required: true },
    attempts: { type: [AttemptSchema], default: [], required: true },
  },
  { timestamps: true }
);

const communityPuzzleModel: Model<CommunityPuzzleSchemaType> =
  mongoose.models.CommunityPuzzles ||
  mongoose.model(
    "CommunityPuzzles",
    CommunityPuzzleSchema,
    "community-puzzles"
  );

export default communityPuzzleModel;
