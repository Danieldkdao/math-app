"use client";

import { useState } from "react";
import Options from "./options";
import TrainMain from "./main";
import { useTrain } from "@/hooks/useTrain";
import { PuzzleSessionServer } from "@/lib/types";
import { savePuzzleSessionAction } from "@/lib/actions";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import SessionDetails from "../user-profile/training-history/session-details";
import Link from "next/link";

const TrainContainer = ({ name, userId }: { name: string; userId: string }) => {
  const [endSession, setEndSession] = useState(false);
  const [puzzleSession, setPuzzleSession] =
    useState<PuzzleSessionServer | null>(null);
  const { userSettings, puzzleHistory } = useTrain();
  const { setIsModalOpen } = useModal();

  const endSaveSession = async () => {
    if (!userSettings) return;
    const newSession: Omit<PuzzleSessionServer, "createdAt" | "_id"> = {
      settings: userSettings,
      user: userId,
      puzzleHistory: puzzleHistory.map((item) => ({
        ...item,
        puzzleId: item.puzzleId.toString(),
      })),
    };
    const response = await savePuzzleSessionAction(newSession);
    if (response.success && response.session) {
      toast.success(response.message);
      setPuzzleSession(response.session);
      setEndSession(true);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full max-w-[800px] bg-gray-100 rounded-md border border-gray-400 p-5">
      {endSession ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-500">
            Great job, {name}! Here's how you did:
          </h1>
          <SessionDetails puzzleSession={puzzleSession} />
          <div className="flex flex-col md:flex-row gap-4 flex-wrap max-w-[600px]">
            <button
              onClick={() => {
                setEndSession(false);
                setIsModalOpen(true);
              }}
              className="py-2 px-5 rounded-md border border-cyan-800 bg-cyan-50 hover:bg-cyan-100 cursor-pointer transition-colors duration-300 ease-in-out text-gray-600 font-medium flex-1 text-center"
            >
              START NEW SESSION
            </button>
            <Link
              href="/user/dashboard"
              className="py-2 px-5 rounded-md border border-cyan-800 bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300 ease-in-out text-gray-600 font-medium flex-1 text-center"
            >
              RETURN TO DASHBOARD
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Options />
          <hr className="text-gray-400 mb-4" />
          <TrainMain endSaveSession={endSaveSession} />
        </div>
      )}
    </div>
  );
};

export default TrainContainer;
