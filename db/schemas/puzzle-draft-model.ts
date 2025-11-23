import type { MathCommunityPuzzleDraft } from "@/lib/types";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";
import mongoose, { Document, Schema, Model } from "mongoose";

type PuzzleDraftSchemaType = MathCommunityPuzzleDraft & Document;

const PuzzleDraftSchema = new Schema<PuzzleDraftSchemaType>(
  {
    title: { type: String },
    difficulty: {
      type: String,
      enum: mathPuzzleDifficultyLevels,
      required: true,
    },
    category: { type: String, enum: mathPuzzleCategories, required: true },
    problemText: { type: String },
    answers: { type: [String] },
    hint: { type: String },
    solutionOutline: { type: String },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const puzzleDraftModel: Model<PuzzleDraftSchemaType> = mongoose.models.PuzzleDraft || mongoose.model("PuzzleDraft", PuzzleDraftSchema, "puzzle-drafts");

export default puzzleDraftModel;
