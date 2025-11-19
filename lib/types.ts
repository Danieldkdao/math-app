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
};

export type MathPuzzleCategory =
  | "Algebra"
  | "Logic and Reasoning"
  | "Number Theory"
  | "Combinatorics"
  | "Geometry"
  | "Sequences and Series"
  | "Probability"
  | "Game Theory";

export type MathPuzzleDifficultyLevels = "Easy" | "Medium" | "Hard";

export type MathPuzzle = {
  _id: string;
  title: string;
  difficulty: MathPuzzleDifficultyLevels;
  category: MathPuzzleCategory;
  problemText: string;
  solutionOutline: string;
  answer: number;
  hint: string;
};

export type UserSettings = {
  selectedCategories: MathPuzzleCategory[];
  selectedDifficultyLevels: MathPuzzleDifficultyLevels[];
  timeLimitPerPuzzle: number | null;
  hints: boolean;
  skips: boolean;
  numberOfPuzzles: number;
};

export type SessionPuzzle = {
  puzzleId: mongoose.Types.ObjectId;
  userAnswer: number | null;
  result: "correct" | "incorrect" | "skipped";
  timeSpent: number;
  hintUsed: boolean;
};

export type PuzzleSession = {
  _id: string;
  settings: UserSettings;
  puzzleHistory: SessionPuzzle[];
  user: string;
  createdAt: Date;
};

export type PuzzleSessionDetails = Omit<SessionPuzzle, "puzzleId"> & {
  puzzleId: MathPuzzle;
};

export type PuzzleSessionServer = Omit<PuzzleSession, "puzzleHistory"> & {
  puzzleHistory: Array<Omit<SessionPuzzle, "puzzleId"> & { puzzleId: string }>;
};

export type PopulatedPuzzleSession = Omit<PuzzleSessionServer, "puzzleHistory"> & {
  puzzleHistory: Array<
    Omit<SessionPuzzle, "puzzleId"> & { puzzleId: MathPuzzle }
  >;
};
