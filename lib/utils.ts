import { MathPuzzleCategory, MathPuzzleDifficultyLevels } from "./types";

export const mathPuzzleCategories: MathPuzzleCategory[] = [
  "Algebra",
  "Logic and Reasoning",
  "Number Theory",
  "Combinatorics",
  "Geometry",
  "Sequences and Series",
  "Probability",
  "Game Theory",
]

export const mathPuzzleDifficultyLevels: MathPuzzleDifficultyLevels[] = [
  "Easy",
  "Medium",
  "Hard",
];

export const formatTime = (time: Date | string | number | undefined | null) => {
  if (!time) return { date: "Unavailable", time: "Unavailable" };
  const date = new Date(time);
  const dayMonthYear = Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(date);
  const timeFormat = Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);
  return { date: dayMonthYear, time: timeFormat };
};
