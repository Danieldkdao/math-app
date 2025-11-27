"use client";

import type {
  MathPuzzleCategory,
  MathPuzzleDifficultyLevel,
} from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type SortBy = "newest" | "most-attempts" | "highest-rated";

type PuzzleContextType = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCategories: MathPuzzleCategory[];
  setSelectedCategories: Dispatch<SetStateAction<MathPuzzleCategory[]>>;
  selectedDifficultyLevels: MathPuzzleDifficultyLevel[];
  setSelectedDifficultyLevels: Dispatch<
    SetStateAction<MathPuzzleDifficultyLevel[]>
  >;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

const PuzzleContext = createContext<PuzzleContextType | null>(null);

export const PuzzleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    MathPuzzleCategory[]
  >([]);
  const [selectedDifficultyLevels, setSelectedDifficultyLevels] = useState<
    MathPuzzleDifficultyLevel[]
  >([]);
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  const values = {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedDifficultyLevels,
    setSelectedDifficultyLevels,
    sortBy,
    setSortBy,
  };

  return (
    <PuzzleContext.Provider value={values}>{children}</PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context)
    throw new Error(
      "Puzzle context must be used inside the puzzle context provider."
    );
  return context;
};
