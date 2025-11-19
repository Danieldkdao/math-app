import { PopulatedPuzzleSession } from "@/lib/types";
import { convertTime } from "./session-details";
import { formatTime } from "@/lib/utils";
import Link from "next/link";

const SessionCard = ({ puzzleSession }: { puzzleSession: PopulatedPuzzleSession }) => {
  return (
    <Link href={`/user/profile/session-history/session/${puzzleSession._id}`}>
      <div
        key={puzzleSession._id}
        className="p-4 rounded-md border border-gray-400 space-y-2 cursor-pointer"
      >
        <h1 className="text-center text-lg font-medium text-gray-600">
          📊 SESSION SUMMARY
        </h1>
        <hr className="text-gray-400" />
        <div>
          <h1 className="text-gray-500 font-medium text-sm">
            {formatTime(puzzleSession.createdAt).date} at{" "}
            {formatTime(puzzleSession.createdAt).time}
          </h1>
          <h1 className="text-gray-500 font-medium text-sm">
            Score:{" "}
            <span className="text-cyan-800">
              {
                puzzleSession.puzzleHistory.filter((item) => item.result === "correct")
                  .length
              }
              /{puzzleSession.settings.numberOfPuzzles}
            </span>
          </h1>
          <h1 className="text-gray-500 font-medium text-sm">
            Total Time:{" "}
            <span className="text-cyan-800">
              {
                convertTime(
                  puzzleSession.puzzleHistory.reduce((a, b) => a + b.timeSpent, 0)
                ).timeString
              }{" "}
              {
                convertTime(
                  puzzleSession.puzzleHistory.reduce((a, b) => a + b.timeSpent, 0)
                ).unit
              }
            </span>
          </h1>
        </div>
        <hr className="text-gray-400" />
        <div className="text-gray-500 font-medium text-sm space-y-2">
          <h1>
            Difficulty:{" "}
            <span className="text-cyan-800">
              {puzzleSession.settings.selectedDifficultyLevels.join(", ")}
            </span>
          </h1>
          <h1>
            Categories:{" "}
            <span className="text-cyan-800">
              {puzzleSession.settings.selectedCategories.join(", ")}
            </span>
          </h1>
          <h1>
            Time Limit:{" "}
            <span className="text-cyan-800">
              {puzzleSession.settings.timeLimitPerPuzzle
                ? `${puzzleSession.settings.timeLimitPerPuzzle} sec / puzzle`
                : "None"}
            </span>
          </h1>
        </div>
        <hr className="text-gray-400" />
        <p className="text-sm font-medium text-gray-600">
          Click to see more details
        </p>
      </div>
    </Link>
  );
};

export default SessionCard;
