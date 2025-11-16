import { PuzzleSessionServer } from "@/lib/types";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type FinishResultsPropsType = {
  name: string;
  puzzleSession: PuzzleSessionServer | null;
  setEndSession: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FinishResults = ({
  name,
  puzzleSession,
  setEndSession,
  setIsModalOpen,
}: FinishResultsPropsType) => {
  if (!puzzleSession) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mb-2">
          No Session Found
        </h1>
        <p className="text-gray-600">
          Looks like we were unable to find one of your sessions. You might have
          deleted it or it might not have existed in the first place.
        </p>
      </div>
    );
  }
  const correctPuzzles = puzzleSession.puzzleHistory.filter(
    (item) => item.result === "correct"
  ).length;
  const puzzlesAttempted = puzzleSession.puzzleHistory.filter(
    (item) => item.result !== "skipped"
  ).length;
  const totalTimeTakenSec = puzzleSession.puzzleHistory.reduce(
    (a, b) => a + b.timeSpent,
    0
  );
  const convertTime = (seconds: number) => {
    const timeString = `${String(Math.floor(seconds / 60)).padStart(
      2,
      "0"
    )}:${String(seconds % 60).padStart(2, "0")}`;
    return {
      seconds: seconds.toFixed(1),
      unit: seconds / 60 < 1 ? "sec" : "min",
      timeString,
    };
  };
  const averageTimePerPuzzle =
    puzzleSession.puzzleHistory
      .filter((item) => item.result !== "skipped")
      .reduce((a, b) => a + b.timeSpent, 0) /
    puzzleSession.puzzleHistory.filter((item) => item.result !== "skipped")
      .length;

  const averageTimeCorrectPuzzle =
    puzzleSession.puzzleHistory
      .filter((item) => item.result === "correct")
      .reduce((a, b) => a + b.timeSpent, 0) /
    puzzleSession.puzzleHistory.filter((item) => item.result === "correct")
      .length;

  const averageTimeIncorrectPuzzle =
    puzzleSession.puzzleHistory
      .filter((item) => item.result === "incorrect")
      .reduce((a, b) => a + b.timeSpent, 0) /
    puzzleSession.puzzleHistory.filter((item) => item.result === "incorrect")
      .length;

  const arrayOfTimes = puzzleSession.puzzleHistory
    .filter((item) => item.result === "correct")
    .map((item) => item.timeSpent);

  const fastestPuzzle =
    arrayOfTimes.length === 0
      ? "Unavailable"
      : convertTime(Math.min(...arrayOfTimes)).unit === "sec"
      ? convertTime(Math.min(...arrayOfTimes)).seconds
      : convertTime(Math.min(...arrayOfTimes)).timeString;

  const slowestPuzzle =
    arrayOfTimes.length === 0
      ? "Unavailable"
      : convertTime(Math.max(...arrayOfTimes)).unit === "sec"
      ? convertTime(Math.max(...arrayOfTimes)).seconds
      : convertTime(Math.max(...arrayOfTimes)).timeString;

  const mainStats = [
    {
      title: "OVERALL SCORE",
      value: `${correctPuzzles}/${puzzleSession.settings.numberOfPuzzles}`,
      subtext: `(${Math.round(
        (correctPuzzles / puzzleSession.settings.numberOfPuzzles) * 100
      )}% correct)`,
    },
    {
      title: "ACCURACY",
      value: `${((correctPuzzles / puzzlesAttempted) * 100).toFixed(1)}%`,
      subtext: "(Correct/Attempted)",
    },
    {
      title: "TOTAL TIME",
      value: convertTime(totalTimeTakenSec).timeString,
      subtext: "(min:sec)",
    },
  ];

  const puzzleResults = [
    {
      title: "Correct",
      value: correctPuzzles,
    },
    {
      title: "Incorrect",
      value: puzzlesAttempted - correctPuzzles,
    },
    {
      title: "Skipped",
      value: puzzleSession.puzzleHistory.length - puzzlesAttempted,
    },
    {
      title: "Total Attempted",
      value: puzzlesAttempted,
    },
    {
      title: "Total Puzzles",
      value: puzzleSession.settings.numberOfPuzzles,
    },
  ];

  const timingAnalysis = [
    {
      title: "Avg. Time per Puzzle",
      value: averageTimePerPuzzle
        ? convertTime(averageTimePerPuzzle).unit === "sec"
          ? convertTime(averageTimePerPuzzle).seconds
          : convertTime(averageTimePerPuzzle).timeString
        : "Unavailable",
      unit: averageTimePerPuzzle ? convertTime(averageTimePerPuzzle).unit : "",
    },
    {
      title: "Avg. Time (Correct)",
      value: averageTimeCorrectPuzzle ? 
        convertTime(averageTimeCorrectPuzzle).unit === "sec"
          ? convertTime(averageTimeCorrectPuzzle).seconds
          : convertTime(averageTimeCorrectPuzzle).timeString : "Unavailable",
      unit: averageTimeCorrectPuzzle ? convertTime(averageTimeCorrectPuzzle).unit : "",
    },
    {
      title: "Avg. Time (Incorrect)",
      value: averageTimeIncorrectPuzzle ?
        convertTime(averageTimeIncorrectPuzzle).unit === "sec"
          ? convertTime(averageTimeIncorrectPuzzle).seconds
          : convertTime(averageTimeIncorrectPuzzle).timeString : "Unavailable",
      unit: averageTimeIncorrectPuzzle ? convertTime(averageTimeIncorrectPuzzle).unit : "",
    },
    {
      title: "Fastest Puzzle",
      value: fastestPuzzle,
      unit: fastestPuzzle ? convertTime(Math.min(...arrayOfTimes)).unit : "",
    },
    {
      title: "Slowest Puzzle",
      value: slowestPuzzle,
      unit: slowestPuzzle ? convertTime(Math.max(...arrayOfTimes)).unit : "",
    },
  ];

  const sessionConfig = [
    {
      title: "Time Limit",
      value: puzzleSession.settings.timeLimitPerPuzzle
        ? `${puzzleSession.settings.timeLimitPerPuzzle} sec/puzzle`
        : "None",
    },
    {
      title: "Hints Allowed",
      value: puzzleSession.settings.hints ? "Yes" : "No",
    },
    {
      title: "Skips Allowed",
      value: puzzleSession.settings.skips ? "Yes" : "No",
    },
  ];

  const selectedCategories = puzzleSession.settings.selectedCategories;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Session Results</h1>
      <hr className="text-gray-400" />
      <div className="space-y-4">
        <p className="text-xl font-medium">
          Great job, {name}! Here's how you did:
        </p>
        <div className="grid grid-cols-3 gap-4">
          {mainStats.map((item, index) => (
            <div key={index} className="border rounded-md border-gray-400 p-4">
              <h1 className="text-lg font-medium text-center text-gray-600">
                {item.title}
              </h1>
              <div className="text-center text-gray-500">
                <h1>{item.value}</h1>
                <h1>{item.subtext}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="text-gray-400" />
      <h1 className="text-xl font-bold">PERFORMANCE BREAKDOWN</h1>
      <hr className="text-gray-400" />
      <div className="flex gap-4">
        <div className="flex-1 border rounded-md border-gray-400 p-4 space-y-2">
          <h1 className="font-medium text-gray-600">PUZZLE RESULTS</h1>
          <div>
            {puzzleResults.map((item, index) => {
              const split = index === 3;

              return (
                <div key={index}>
                  {split && <hr className="text-gray-400 mt-2" />}
                  <div className={`flex ${split && "mt-2"}`}>
                    <h1 className="flex-2 text-gray-500">{item.title}:</h1>
                    <h1 className="flex-1 font-bold text-gray-500">
                      {item.value}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-[1.75] border rounded-md border-gray-400 p-4 space-y-2">
          <h1 className="font-medium text-gray-600">TIMING ANALYSIS</h1>
          <div>
            {timingAnalysis.map((item, index) => {
              const split = index === 3;
              return (
                <div key={index}>
                  {split && <hr className="text-gray-400 mt-2" />}
                  <div className={`flex ${split && "mt-2"}`}>
                    <h1 className="flex-2 text-gray-500">{item.title}:</h1>
                    <h1 className="flex-1 font-bold text-gray-500">
                      {`${item.value} ${item.unit}`}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <hr className="text-gray-400" />
      <h1 className="text-xl font-bold">SESSION CONFIGURATION</h1>
      <hr className="text-gray-400" />
      <div className="border rounded-md border-gray-400 p-4 space-y-2">
        <h1 className="text-lg font-medium text-gray-600">
          Selected Categories
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedCategories.map((item, index) => {
            return (
              <p
                key={index}
                className="py-1 px-2 rounded-md font-medium text-gray-600 bg-cyan-50 text-sm border border-cyan-800"
              >
                {item}
              </p>
            );
          })}
        </div>
        <div className="w-full max-w-60 mt-4">
          {sessionConfig.map((item, index) => {
            return (
              <div className="flex" key={index}>
                <div className="flex-1">
                  <h1 className="text-gray-500">{item.title}:</h1>
                </div>
                <div className="flex-1">
                  <h1 className="text-gray-500 font-bold">{item.value}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => {
            setEndSession(false);
            setIsModalOpen(true);
          }}
          className="py-2 px-5 rounded-md border border-cyan-800 bg-cyan-50 hover:bg-cyan-100 cursor-pointer transition-colors duration-300 ease-in-out text-gray-600 font-medium"
        >
          START NEW SESSION
        </button>
        <Link
          href="/user/dashboard"
          className="py-2 px-5 rounded-md border border-cyan-800 bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300 ease-in-out text-gray-600 font-medium"
        >
          RETURN TO DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default FinishResults;
