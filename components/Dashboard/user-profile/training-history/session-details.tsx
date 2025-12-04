import { PopulatedPuzzleSession, PuzzleSessionServer } from "@/lib/types";

export const convertTime = (seconds: number) => {
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

const SessionDetails = ({
  puzzleSession,
}: {
  puzzleSession: PuzzleSessionServer | PopulatedPuzzleSession | null;
}) => {
  if (!puzzleSession)
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-center">
          No Information Available
        </h1>
        <p className="text-gray-600">
          The details and statistics for this session are unfortunately
          unavailable at the moment. The details might be non-existent or we
          might be facing technical difficulties. If so, try to access another
          session's details or come back at a later time.
        </p>
      </div>
    );
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
      value: puzzlesAttempted > 0 ? `${((correctPuzzles / puzzlesAttempted) * 100).toFixed(1)}%` : "Unavailable",
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
      value: averageTimeCorrectPuzzle
        ? convertTime(averageTimeCorrectPuzzle).unit === "sec"
          ? convertTime(averageTimeCorrectPuzzle).seconds
          : convertTime(averageTimeCorrectPuzzle).timeString
        : "Unavailable",
      unit: averageTimeCorrectPuzzle
        ? convertTime(averageTimeCorrectPuzzle).unit
        : "",
    },
    {
      title: "Avg. Time (Incorrect)",
      value: averageTimeIncorrectPuzzle
        ? convertTime(averageTimeIncorrectPuzzle).unit === "sec"
          ? convertTime(averageTimeIncorrectPuzzle).seconds
          : convertTime(averageTimeIncorrectPuzzle).timeString
        : "Unavailable",
      unit: averageTimeIncorrectPuzzle
        ? convertTime(averageTimeIncorrectPuzzle).unit
        : "",
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
  const selectedDifficultyLevels =
    puzzleSession.settings.selectedDifficultyLevels;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">SESSION OVERVIEW</h1>
      <hr className="text-gray-400" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <hr className="text-gray-400" />
      <h1 className="text-xl font-bold">PERFORMANCE BREAKDOWN</h1>
      <hr className="text-gray-400" />
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="md:flex-1 border rounded-md border-gray-400 p-4 space-y-2">
          <h1 className="font-medium text-gray-600">PUZZLE RESULTS</h1>
          <div>
            {puzzleResults.map((item, index) => {
              const split = index === 3;

              return (
                <div key={index}>
                  {split && <hr className="text-gray-400 mt-2" />}
                  <div className={`flex flex-wrap gap-2 ${split && "mt-2"}`}>
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
        <div className="md:flex-[1.75] border rounded-md border-gray-400 p-4 space-y-2">
          <h1 className="font-medium text-gray-600">TIMING ANALYSIS</h1>
          <div>
            {timingAnalysis.map((item, index) => {
              const split = index === 3;
              return (
                <div key={index}>
                  {split && <hr className="text-gray-400 mt-2" />}
                  <div className={`flex flex-wrap gap-2 ${split && "mt-2"}`}>
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
        <h1 className="text-lg font-medium text-gray-600">
          Selected Difficulty Levels
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedDifficultyLevels.map((item, index) => {
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
        <div className="w-full max-w-60 mt-4 space-y-2">
          {sessionConfig.map((item, index) => {
            return (
              <div className="flex flex-wrap gap-2" key={index}>
                <div className="flex-1 min-w-[140px]">
                  <h1 className="text-gray-500">{item.title}:</h1>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <h1 className="text-gray-500 font-bold">{item.value}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
