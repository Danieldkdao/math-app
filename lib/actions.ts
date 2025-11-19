"use server";

import mathPuzzleModel from "@/db/schemas/math-puzzle-model";
import {
  MathPuzzleCategory,
  MathPuzzleDifficultyLevels,
  PuzzleSession,
  PuzzleSessionServer,
} from "./types";
import { connectDB } from "@/db/db";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "./utils";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";

export const fetchPuzzlesAction = async (
  selectedCategories: MathPuzzleCategory[],
  selectedDifficultyLevels: MathPuzzleDifficultyLevels[],
  numberOfPuzzles: number
) => {
  await connectDB();
  const data = await mathPuzzleModel.aggregate([
    {
      $match: {
        category: {
          $in:
            selectedCategories.length === 0
              ? mathPuzzleCategories
              : selectedCategories,
        },
        difficulty: {
          $in:
            selectedDifficultyLevels.length === 0
              ? mathPuzzleDifficultyLevels
              : selectedDifficultyLevels,
        },
      },
    },
    {
      $sample: {
        size: numberOfPuzzles,
      },
    },
  ]);
  const puzzles = data.map((item) => JSON.parse(JSON.stringify(item)));
  return puzzles;
};

export const savePuzzleSessionAction = async (
  session: Omit<PuzzleSessionServer, "createdAt" | "_id">
) => {
  try {
    const newSession = await puzzleSessionModel.create(session);
    if (!newSession) throw new Error("No session found.");
    const parsedSession: PuzzleSessionServer = JSON.parse(
      JSON.stringify(newSession)
    );
    return {
      success: true,
      message: "Session saved successfully!",
      session: parsedSession,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to save session." };
  }
};
