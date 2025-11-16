"use client"
import { MathPuzzle, SessionPuzzle, UserSettings } from "@/lib/types";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type TrainContextType = {
  userSettings: UserSettings | null;
  setUserSettings: Dispatch<SetStateAction<UserSettings | null>>;
  trainPuzzles: MathPuzzle[];
  setTrainPuzzles: Dispatch<SetStateAction<MathPuzzle[]>>;
  puzzleHistory: SessionPuzzle[];
  setPuzzleHistory: Dispatch<SetStateAction<SessionPuzzle[]>>;
};

const TrainContext = createContext<TrainContextType | null>(null);

export const TrainContextProvider = ({ children }: { children: ReactNode }) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [trainPuzzles, setTrainPuzzles] = useState<MathPuzzle[]>([]);
  const [puzzleHistory, setPuzzleHistory] = useState<SessionPuzzle[]>([]);

  return (
    <TrainContext.Provider
      value={{
        userSettings,
        setUserSettings,
        trainPuzzles,
        setTrainPuzzles,
        puzzleHistory,
        setPuzzleHistory,
      }}
    >
      {children}
    </TrainContext.Provider>
  );
};

export const useTrain = () => {
  const context = useContext(TrainContext);
  if (!context)
    throw new Error(
      "Train context must be used inside the train context provider."
    );
  return context;
};
