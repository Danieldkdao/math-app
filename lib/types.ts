import mongoose from "mongoose";

export type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
  banned: boolean;
}

export type MathPuzzleCategory =
  | "Logic and Deduction"
  | "Number Theory and Combinatorics"
  | "Algebra and Systems of Equations"
  | "Game Theory and Strategy"
  | "Creative and Multi-Step";

export type MathPuzzle = {
  _id: string;
  title: string;
  category: MathPuzzleCategory;
  problemText: string;
  answer: number;
};

export type UserSettings = {
  selectedCategories: MathPuzzleCategory[];
  timeLimitPerPuzzle: number | null;
  hints: boolean;
  skips: boolean;
  numberOfPuzzles: number;
}

export type SessionPuzzle = {
  puzzleId: mongoose.Types.ObjectId;
  userAnswer: number | null;
  result: "correct" | "incorrect" | "skipped";
  timeSpent: number;
}

export type PuzzleSession = {
  settings: UserSettings;
  puzzleHistory: SessionPuzzle[];
  user: string;
  createdAt: Date;
}

export type PuzzleSessionServer = Omit<PuzzleSession, "puzzleHistory"> & {
  puzzleHistory: Array<Omit<SessionPuzzle, "puzzleId"> & {puzzleId: string}>
}
