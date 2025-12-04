"use client";
import { useTrain } from "@/hooks/useTrain";
import { SessionPuzzle } from "@/lib/types";
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import {
  FaChevronRight,
  FaCircleQuestion,
  FaClock,
  FaForward,
  FaGear,
} from "react-icons/fa6";
import MarkdownRenderer from "@/components/General/markdown-renderer";
import { useModal } from "@/hooks/useModal";

const TrainMain = ({
  endSaveSession,
}: {
  endSaveSession: () => Promise<void>;
}) => {
  const {
    trainPuzzles,
    userSettings,
    setPuzzleHistory,
    setTrainPuzzles,
    setUserSettings,
  } = useTrain();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentPuzzleResult, setCurrentPuzzleResult] = useState<
    "correct" | "incorrect" | "skipped" | null
  >(null);
  const [next, setNext] = useState(false);
  const [totalTimeSec, setTotalTimeSec] = useState<number | null>(null);
  const [timeSpentIndividual, setTimeSpentIndividual] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const { setIsModalOpen } = useModal();

  useEffect(() => {
    setTotalTimeSec(
      userSettings?.timeLimitPerPuzzle
        ? trainPuzzles.length * userSettings.timeLimitPerPuzzle
        : null
    );
  }, [userSettings]);

  useEffect(() => {
    if (!userSettings) return;
    const intervalTimer = setInterval(async () => {
      if (next) return;
      setTimeSpentIndividual((prev) => prev + 1);
      if (totalTimeSec === null) return;
      if (totalTimeSec < 1) {
        await finish(false);
        return;
      }
      setTotalTimeSec(totalTimeSec - 1);
    }, 1000);
    return () => clearInterval(intervalTimer);
  }, [totalTimeSec, next, userSettings]);

  if (!userSettings) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-center">
          No Settings Specified
        </h1>
        <p className="text-gray-600">
          Looks like you haven't specified any settings for your training
          session! Go to the settings button at top right and specify there.
        </p>
      </div>
    );
  }

  if (!trainPuzzles || trainPuzzles.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-center">No Puzzles Found</h1>
        <p className="text-gray-600 text-center">
          Looks like there no puzzles that match your specified settings. Tweak
          your settings, then try again.
        </p>
      </div>
    );
  }

  const currentPuzzle = trainPuzzles[currentPuzzleIndex];
  const percentComplete = (currentPuzzleIndex + 1) / trainPuzzles.length;
  const minutes = totalTimeSec === null ? null : Math.floor(totalTimeSec / 60);
  const seconds = totalTimeSec === null ? null : totalTimeSec % 60;

  const nextPuzzle = async () => {
    if (currentPuzzleIndex + 2 > trainPuzzles.length) {
      await finish(false);
      return;
    }
    setHintUsed(false);
    setShowSolution(false);
    setTimeSpentIndividual(0);
    setCurrentPuzzleIndex((cpi) => cpi + 1);
    setUserAnswer("");
    setCurrentPuzzleResult(null);
    setNext(false);
  };

  const checkAnswer = (skipped: boolean) => {
    if (skipped) {
      const newPuzzleHistory: SessionPuzzle = {
        puzzleId: new mongoose.Types.ObjectId(currentPuzzle._id),
        userAnswer: "",
        result: "skipped",
        timeSpent: timeSpentIndividual,
        hintUsed,
      };
      setPuzzleHistory((prev) => [...prev, newPuzzleHistory]);
      setCurrentPuzzleResult("skipped");
      setNext(true);
      return;
    }
    if (!userAnswer) return toast.error("Answer cannot be empty.");
    const result = currentPuzzle.answers.find(
      (item) => item.trim() === userAnswer.trim()
    )
      ? "correct"
      : "incorrect";
    const newPuzzleHistory: SessionPuzzle = {
      puzzleId: new mongoose.Types.ObjectId(currentPuzzle._id),
      userAnswer,
      result,
      timeSpent: timeSpentIndividual,
      hintUsed,
    };
    setPuzzleHistory((prev) => [...prev, newPuzzleHistory]);
    setCurrentPuzzleResult(result);
    setNext(true);
  };

  const finish = async (middle: boolean) => {
    if (!middle) {
      await endSaveSession();
    }
    setPuzzleHistory([]);
    setCurrentPuzzleIndex(0);
    setHintUsed(false);
    setShowSolution(false);
    setUserAnswer("");
    setCurrentPuzzleResult(null);
    setNext(false);
    setTotalTimeSec(null);
    setTimeSpentIndividual(0);
    setTrainPuzzles([]);
    setUserSettings(null);
  };

  const startNewSession = async () => {
    if (
      !confirm(
        "Are you sure you want to start a new session? You will lose all your current progress."
      )
    )
      return;
    await finish(true);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center justify-between gap-2 w-full">
        <h1 className="text-lg sm:text-xl font-medium">Train</h1>
        <button
          onClick={startNewSession}
          className="cursor-pointer p-2 rounded-md hover:bg-gray-200"
        >
          <FaGear />
        </button>
      </div>
      <hr className="text-gray-400 mb-4" />
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <h2>Progress:</h2>
            <progress className="rounded-md" value={percentComplete} />
            <h2 className="font-bold">
              {currentPuzzleIndex + 1}/{trainPuzzles.length}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {userSettings.hints && (
              <button
                onClick={() => {
                  if (next) return;
                  setHintUsed(true);
                }}
                className={`flex items-center gap-2 rounded-md py-1 px-2 ${
                  next
                    ? "cursor-not-allowed opacity-60"
                    : "hover:bg-gray-200 cursor-pointer"
                }`}
              >
                <FaCircleQuestion />
                Hint
              </button>
            )}
            <div className="border flex items-center gap-2 py-1 px-2 rounded-md border-gray-400">
              <FaClock />
              <h1 className="font-bold">
                {totalTimeSec !== null
                  ? `${String(minutes).padStart(2, "0")}:${String(
                      seconds
                    ).padStart(2, "0")}`
                  : "None"}
              </h1>
            </div>
          </div>
        </div>
        <div className="border rounded-md border-gray-400 p-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="bg-cyan-50 py-1 px-2 rounded-md font-medium text-gray-600 text-sm">
              {currentPuzzle.category}
            </h1>
            <h1 className="bg-cyan-50 py-1 px-2 rounded-md font-medium text-gray-600 text-sm">
              {currentPuzzle.difficulty}
            </h1>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold line-clamp-1">
              <MarkdownRenderer text={currentPuzzle.title} />
            </h1>
            <div className="max-h-[10ch] overflow-auto text-lg font-medium text-gray-600">
              <MarkdownRenderer text={currentPuzzle.problemText} />
            </div>
            {hintUsed && (
              <div className="text-gray-600 bg-yellow-100 rounded-md py-1 px-2 text-sm flex">
                Hint💡:
                <MarkdownRenderer text={currentPuzzle.hint} />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row md:items-center gap-2">
            <label htmlFor="answer">Your answer:</label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.trim())}
              id="answer"
              className="border-b-2 border-gray-600 outline-0 w-20"
            />
          </div>
          {currentPuzzleResult === null ? (
            <></>
          ) : currentPuzzleResult === "correct" ? (
            <div className="bg-green-200 p-4 rounded-md border-l-8 border-green-600">
              <div>
                Correct!{" "}
                {`${
                  currentPuzzle.answers.length > 1
                    ? "The answers are"
                    : "The answer is"
                } ${currentPuzzle.answers.join(", ")}`}
                .
              </div>
              <div>
                <div
                  onClick={() => setShowSolution(!showSolution)}
                  className="cursor-pointer flex items-center w-full justify-between"
                >
                  <h1 className="text-gray-600">Show Solution</h1>
                  <FaChevronRight
                    className={`transition-all duration-300 ease-in-out ${
                      showSolution ? "rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-600 ${
                    showSolution
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <MarkdownRenderer text={currentPuzzle.solutionOutline} />
                </div>
              </div>
            </div>
          ) : currentPuzzleResult === "skipped" ? (
            <div className="bg-gray-200 p-4 rounded-md border-l-8 border-gray-600">
              <div>
                {`${
                  currentPuzzle.answers.length > 1
                    ? "The answers are"
                    : "The answer is"
                } ${currentPuzzle.answers.join(", ")}`}
                .
              </div>
              <div>
                <div
                  onClick={() => setShowSolution(!showSolution)}
                  className="cursor-pointer flex items-center w-full justify-between"
                >
                  <h1 className="text-gray-600">Show Solution</h1>
                  <FaChevronRight
                    className={`transition-all duration-300 ease-in-out ${
                      showSolution ? "rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-600 ${
                    showSolution
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <MarkdownRenderer text={currentPuzzle.solutionOutline} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-200 p-4 rounded-md border-l-8 border-red-600">
              <div>
                Sorry, incorrect...{" "}
                {`${
                  currentPuzzle.answers.length > 1
                    ? "The answers are"
                    : "The answer is"
                } ${currentPuzzle.answers.join(", ")}`}
                .
              </div>
              <div>
                <div
                  onClick={() => setShowSolution(!showSolution)}
                  className="cursor-pointer flex items-center w-full justify-between"
                >
                  <h1 className="text-gray-600">Show Solution</h1>
                  <FaChevronRight
                    className={`transition-all duration-300 ease-in-out ${
                      showSolution ? "rotate-90" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-600 ${
                    showSolution
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <MarkdownRenderer text={currentPuzzle.solutionOutline} />
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between w-full max-w-[300px]">
            {userSettings.skips && (
              <button
                disabled={next}
                onClick={() => checkAnswer(true)}
                className={`flex items-center justify-center gap-2 rounded-md py-2 px-5 bg-cyan-50 ${
                  next
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:bg-cyan-100 transition-all duration-300 ease-in-out"
                }`}
              >
                <FaForward />
                Skip
              </button>
            )}
            <button
              onClick={next ? nextPuzzle : () => checkAnswer(false)}
              className="flex items-center justify-center gap-2 rounded-md py-2 px-5 bg-cyan-50 cursor-pointer hover:bg-cyan-100 transition-all duration-300 ease-in-out"
            >
              <FaCheckCircle />
              {next
                ? currentPuzzleIndex + 1 === trainPuzzles.length
                  ? "Finish"
                  : "Next"
                : "Check"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainMain;
