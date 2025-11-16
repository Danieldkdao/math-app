import mongoose, { Document, Schema, Model } from "mongoose";
import { MathPuzzle } from "@/lib/types";

type MathPuzzleSchemaType = MathPuzzle & Document;

const MathPuzzleSchema = new Schema<MathPuzzleSchemaType>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  problemText: { type: String, required: true },
  answer: { type: Number, required: true },
});

const mathPuzzleModel: Model<MathPuzzleSchemaType> =
  mongoose.models.MathPuzzles ||
  mongoose.model("MathPuzzles", MathPuzzleSchema, "math-puzzles");

export default mathPuzzleModel;
