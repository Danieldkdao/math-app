import mongoose from "mongoose";

export type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null | undefined;
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

export type MathPuzzleDifficultyLevel = "Easy" | "Medium" | "Hard";

export type MathPuzzle = {
  _id: string;
  title: string;
  difficulty: MathPuzzleDifficultyLevel;
  category: MathPuzzleCategory;
  problemText: string;
  solutionOutline: string;
  answers: string[];
  hint: string;
};

export type MathCommunityPuzzleDraft = MathPuzzle & {
  user: Author;
  createdAt: Date;
  updatedAt: Date;
}

export type Rating = {
  user: string;
  rating: RatingNum
}

export type RatingNum = 1 | 2 | 3 | 4 | 5;

export type Flag = {
  user: string;
  reason: string;
}

export type MathCommunityPuzzle = MathPuzzle & {
  user: Author;
  createdAt: Date;
  ratings: Rating[];
  flags: Flag[];
  comments: ThreadReply[];
  attempts: Attempt[];
}

export type Attempt = {
  user: string;
  answer: string;
  result: "correct" | "incorrect";
}

export type UserSettings = {
  selectedCategories: MathPuzzleCategory[];
  selectedDifficultyLevels: MathPuzzleDifficultyLevel[];
  timeLimitPerPuzzle: number | null;
  hints: boolean;
  skips: boolean;
  numberOfPuzzles: number;
};

export type SessionPuzzle = {
  puzzleId: mongoose.Types.ObjectId;
  userAnswer: string;
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

export type PopulatedPuzzleSession = Omit<
  PuzzleSessionServer,
  "puzzleHistory"
> & {
  puzzleHistory: Array<
    Omit<SessionPuzzle, "puzzleId"> & { puzzleId: MathPuzzle }
  >;
};

export type ChatSession = {
  chats: Chat[];
  user: string;
  createdAt: Date;
  _id: string;
};

export type Chat = {
  role: "user" | "assistant";
  content: string;
  _id: string;
};

export type NoIdChat = {
  role: "user" | "assistant";
  content: string;
};

export type ThreadCategories =
  | "Help & Hints"
  | "Strategy"
  | "Theory"
  | "Showcase"
  | "Off-topic";

export type Author = Pick<User, "name" | "image"> & { id: string };

export type ThreadReply = {
  author: Author;
  content: string;
  createdAt: Date;
  _id: string;
};

export type Thread = {
  _id: string;
  title: string;
  threadPrompt: string;
  startedBy: mongoose.Types.ObjectId;
  category: ThreadCategories;
  replies: ThreadReply[];
  createdAt: Date;
};

export type PopulatedThread = Omit<Thread, "startedBy"> & { startedBy: User };
