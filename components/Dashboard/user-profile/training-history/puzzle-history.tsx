"use client";

import { PuzzleSessionDetails } from "@/lib/types";
import PuzzleDetailsModal from "./puzzle-details-modal";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";

const colorPuzzleResultReference = {
  correct: {
    dotColor: "bg-green-500",
    textColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  incorrect: {
    dotColor: "bg-red-500",
    textColor: "text-red-500",
    bgColor: "bg-red-100",
  },
  skipped: {
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
};

const PuzzleHistory = ({
  puzzleHistory,
}: {
  puzzleHistory: PuzzleSessionDetails[];
}) => {
  const [currentMathPuzzleOpen, setCurrentMathPuzzleOpen] =
    useState<PuzzleSessionDetails | null>(null);
  const { setIsModalOpen } = useModal();
  return (
    <div className="flex items-center flex-wrap gap-2">
      {puzzleHistory.map((item, index) => {
        const color = colorPuzzleResultReference[item.result];
        return (
          <div
            key={index}
            onClick={() => {
              setCurrentMathPuzzleOpen(item);
              setIsModalOpen(true);
            }}
            className={`flex items-center gap-1 cursor-pointer ${color.bgColor} rounded py-1 px-2`}
          >
            <p className={`font-medium ${color.textColor}`}>{index + 1}.</p>
            <div
              className={`size-4 rounded-full ${color.dotColor}`}
            ></div>
          </div>
        );
      })}
      <PuzzleDetailsModal mathPuzzle={currentMathPuzzleOpen} />
    </div>
  );
};

export default PuzzleHistory;
