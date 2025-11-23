import {
  MathPuzzleCategory,
  MathPuzzleDifficultyLevel,
  ThreadCategories,
} from "./types";

export const mathPuzzleCategories: MathPuzzleCategory[] = [
  "Algebra",
  "Logic and Reasoning",
  "Number Theory",
  "Combinatorics",
  "Geometry",
  "Sequences and Series",
  "Probability",
  "Game Theory",
];

export const mathPuzzleDifficultyLevels: MathPuzzleDifficultyLevel[] = [
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
  const timeFormat = Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(date);
  return { date: dayMonthYear, time: timeFormat };
};

export const timeAgo = (input: string | Date | number) => {
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return "Invalid Date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
};

export const threadCategories: ThreadCategories[] = [
  "Help & Hints",
  "Strategy",
  "Theory",
  "Showcase",
  "Off-topic",
];
