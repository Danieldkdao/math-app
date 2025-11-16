"use client";

import { useState } from "react";
import FinishResults from "./finish-results";
import Options from "./options";
import TrainMain from "./main";
import { useTrain } from "@/hooks/useTrain";
import { PuzzleSessionServer } from "@/lib/types";
import { savePuzzleSessionAction } from "@/lib/actions";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";

const TrainContainer = ({ name, userId }: { name: string; userId: string }) => {
  const [endSession, setEndSession] = useState(false);
  const [puzzleSession, setPuzzleSession] =
    useState<PuzzleSessionServer | null>(null);
  const { userSettings, puzzleHistory } = useTrain();
  const { setIsModalOpen } = useModal();

  const endSaveSession = async () => {
    if (!userSettings) return;
    const newSession: Omit<PuzzleSessionServer, "createdAt"> = {
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
        <FinishResults name={name} puzzleSession={puzzleSession} setEndSession={setEndSession} setIsModalOpen={setIsModalOpen}/>
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
