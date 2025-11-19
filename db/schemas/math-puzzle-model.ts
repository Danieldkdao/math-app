import mongoose, { Document, Schema, Model } from "mongoose";
import { MathPuzzle } from "@/lib/types";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";

type MathPuzzleSchemaType = MathPuzzle & Document;

const MathPuzzleSchema = new Schema<MathPuzzleSchemaType>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true, enum: mathPuzzleDifficultyLevels },
  category: { type: String, required: true, enum: mathPuzzleCategories },
  problemText: { type: String, required: true },
  solutionOutline: { type: String, required: true },
  answer: { type: Number, required: true },
  hint: { type: String, required: true },
});

const mathPuzzleModel: Model<MathPuzzleSchemaType> =
  mongoose.models.MathPuzzles ||
  mongoose.model("MathPuzzles", MathPuzzleSchema, "math-puzzles");

export default mathPuzzleModel;
