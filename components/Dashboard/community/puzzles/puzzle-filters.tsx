"use client";

import { usePuzzle, type SortBy } from "@/hooks/usePuzzle";
import type {
  MathPuzzleCategory,
  MathPuzzleDifficultyLevel,
} from "@/lib/types";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";
import { FaLayerGroup, FaSearch } from "react-icons/fa";

const sortByArray = [
  {
    text: "Newest",
    value: "newest",
  },
  {
    text: "Highest rating",
    value: "highest-rated",
  },
  {
    text: "Most attempts",
    value: "most-attempts",
  },
];

const PuzzleFilters = () => {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedCategories,
    selectedCategories,
    selectedDifficultyLevels,
    setSelectedDifficultyLevels,
    setSortBy,
  } = usePuzzle();

  const filterCategories = (value: MathPuzzleCategory) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCategories((prev) => [...prev, value]);
    }
  };

  const filterDifficulty = (value: MathPuzzleDifficultyLevel) => {
    if (selectedDifficultyLevels.includes(value)) {
      setSelectedDifficultyLevels((prev) =>
        prev.filter((item) => item !== value)
      );
    } else {
      setSelectedDifficultyLevels((prev) => [...prev, value]);
    }
  };

  return (
    <header className="space-y-4">
      <div className="space-y-1">
        <p className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
          <FaLayerGroup />
          Community Puzzles
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Browse community-built puzzles
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Explore community puzzles with clear statements, hints, solution
          outlines, ratings, and moderated threads - all fields captured in the
          schema.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2">
            <FaSearch className="text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              placeholder="Search title or author"
              className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
            />
          </div>
          <select
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm"
          >
            {sortByArray.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="font-bold text-gray-700">Categories</h1>
          {mathPuzzleCategories.map((category) => {
            const selected = selectedCategories.includes(category);
            return (
              <span
                key={category}
                onClick={() => filterCategories(category)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold  shadow-sm cursor-pointer ${
                  selected
                    ? "text-cyan-700 border-cyan-700 bg-cyan-100"
                    : "text-gray-700 border-gray-200 bg-white"
                }`}
              >
                {category}
              </span>
            );
          })}
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="font-bold text-gray-700">Categories</h1>
          {mathPuzzleDifficultyLevels.map((difficulty) => {
            const selected = selectedDifficultyLevels.includes(difficulty);
            return (
              <span
                key={difficulty}
                onClick={() => filterDifficulty(difficulty)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold  shadow-sm cursor-pointer ${
                  selected
                    ? "text-cyan-700 border-cyan-700 bg-cyan-100"
                    : "text-gray-700 border-gray-200 bg-white"
                }`}
              >
                {difficulty}
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default PuzzleFilters;
