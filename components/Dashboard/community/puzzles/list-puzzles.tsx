"use client";

import MarkdownRenderer from "@/components/General/markdown-renderer";
import { usePuzzle } from "@/hooks/usePuzzle";
import type { MathCommunityPuzzle } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import {
  FaLayerGroup,
  FaStar,
  FaClock,
  FaFlagCheckered,
  FaArrowRight,
} from "react-icons/fa6";

const sortByOptions = {
  "highest-rated": (a: MathCommunityPuzzle, b: MathCommunityPuzzle) =>
    b.ratings.reduce((a, b) => a + b.rating, 0) / (b.ratings.length || 1) -
    a.ratings.reduce((a, b) => a + b.rating, 0) / (a.ratings.length || 1),
  "most-attempts": (a: MathCommunityPuzzle, b: MathCommunityPuzzle) =>
    b.attempts.length - a.attempts.length,
};

const ListPuzzles = ({ puzzles }: { puzzles: MathCommunityPuzzle[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPuzzles, setFilteredPuzzles] = useState([...puzzles]);
  const { searchQuery, selectedCategories, selectedDifficultyLevels, sortBy } =
    usePuzzle();
  const numPerPage = 6;
  const numberOfPages = Math.floor(puzzles.length / numPerPage);
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(puzzles.length, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const paginationArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePagination = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let filteredPuzzlesTemp = [...puzzles];
    if (searchQuery.trim()) {
      const sq = searchQuery.trim();
      filteredPuzzlesTemp = filteredPuzzlesTemp.filter(
        (item) =>
          item.title.toLowerCase().includes(sq) ||
          item.user.name.toLowerCase().includes(sq)
      );
    }
    if (selectedCategories.length > 0) {
      filteredPuzzlesTemp = filteredPuzzlesTemp.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }
    if (selectedDifficultyLevels.length > 0) {
      filteredPuzzlesTemp = filteredPuzzlesTemp.filter((item) =>
        selectedDifficultyLevels.includes(item.difficulty)
      );
    }
    filteredPuzzlesTemp =
      sortBy === "newest"
        ? filteredPuzzlesTemp
        : filteredPuzzlesTemp.sort(sortByOptions[sortBy]);
    setFilteredPuzzles(filteredPuzzlesTemp);
  }, [
    puzzles,
    searchQuery,
    selectedCategories,
    selectedDifficultyLevels,
    sortBy,
  ]);

  return (
    <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPuzzles
            .slice(
              (currentPage - 1) * numPerPage,
              (currentPage - 1) * numPerPage + numPerPage
            )
            .map((puzzle) => (
              <Link
                key={puzzle.title}
                href={`/user/community/puzzles/${puzzle._id}`}
              >
                <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                      <FaLayerGroup className="text-cyan-600" />
                      {puzzle.category}
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full ring-1 ring-emerald-100">
                      {puzzle.difficulty}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {puzzle.title}
                    </h3>
                    <div className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                      <MarkdownRenderer text={puzzle.problemText} />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaUserFriends className="text-cyan-600" />
                      {puzzle.attempts.length} attempts,{" "}
                      {puzzle.correctAttempts.length} correct
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaStar className="text-amber-500" />
                      {(
                        puzzle.ratings.reduce((a, b) => a + b.rating, 0) /
                        (puzzle.ratings.length || 1)
                      ).toFixed(1)}{" "}
                      avg, {puzzle.ratings.length} ratings
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaClock className="text-gray-500" />
                      {puzzle.answers.length} answer(s) stored
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaFlagCheckered className="text-emerald-600" />
                      {puzzle.comments.length} comments, {puzzle.flags.length}{" "}
                      flags
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 mt-4">
                    Authored by{" "}
                    <span className="text-cyan-700">{puzzle.user.name}</span>
                  </div>
                </article>
              </Link>
            ))}
        </div>

        {puzzles.length > numPerPage && (
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {numberOfPages}
            </div>
            <div className="flex items-center gap-2">
              {paginationArray.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePagination(page)}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    page === currentPage
                      ? "bg-cyan-600 text-white shadow"
                      : "bg-gray-50 text-gray-700 ring-1 ring-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePagination(currentPage + 1)}
                disabled={currentPage === puzzles.length}
                className={`inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 ${
                  currentPage === puzzles.length
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListPuzzles;
