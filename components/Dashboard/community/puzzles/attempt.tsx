"use client";

import LoadingSpinner from "@/components/General/loading-spinner";
import MarkdownRenderer from "@/components/General/markdown-renderer";
import { attemptCommunityPuzzleAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaChevronDown,
  FaExclamationTriangle,
} from "react-icons/fa";

type AnswerCardProps = {
  type: "success" | "error";
  answers: string[];
  outline: string;
};

type AttemptProps = {
  puzzleId: string;
  prevResult: "correct" | "incorrect" | undefined;
  prevAnswer: string | undefined;
  answers: string[];
  hint: string;
  solutionOutline: string;
};

const AnswerCard = ({ type, answers, outline }: AnswerCardProps) => {
  const [open, setOpen] = useState(false);
  const plural = answers.length !== 1;
  const verb = plural ? "are" : "is";
  const answerLabel = plural ? "answers" : "answer";
  const formattedAnswers = answers.join(", ");
  const isSuccess = type === "success";
  const title = isSuccess ? "Success" : "Attempt result";
  const messagePrefix = isSuccess ? "Correct!" : "Sorry, incorrect...";
  const cardColors = isSuccess
    ? "border-emerald-100 bg-emerald-50 text-emerald-900"
    : "border-rose-100 bg-rose-50 text-rose-900";
  const tagColors = isSuccess
    ? "bg-emerald-100 text-emerald-800"
    : "bg-rose-100 text-rose-800";
  const icon = isSuccess ? <FaCheckCircle /> : <FaExclamationTriangle />;

  return (
    <div className={`rounded-xl border p-4 transition-colors ${cardColors}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon}
          <span>{title}</span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tagColors}`}
        >
          {isSuccess ? "Answer matched" : "Try again"}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold">
        {messagePrefix} The {answerLabel} {verb} {formattedAnswers}.
      </p>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-3 inline-flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 transition hover:shadow cursor-pointer"
      >
        <span>View solution outline</span>
        <FaChevronDown
          className={`text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out mt-3 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="rounded-lg bg-white/70 p-4 text-sm text-gray-800 ring-1 ring-gray-200">
          <MarkdownRenderer text={outline} />
        </div>
      </div>
    </div>
  );
};

const Attempt = ({
  puzzleId,
  prevResult,
  prevAnswer,
  answers,
  hint,
  solutionOutline,
}: AttemptProps) => {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState(prevAnswer || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const hasAttempted = prevResult ? true : false;

  const handleAttemptPuzzle = async () => {
    if(loading || (prevResult && prevAnswer)) return;
    setLoading(true);
    if(!userAnswer.trim()) {
      toast.error("Answer cannot be empty.");
      setLoading(false);
      return;
    }
    const trimmedAnswers = answers.map(item => item.trim());
    const result = trimmedAnswers.includes(userAnswer.trim()) ? "correct" : "incorrect";
    const response = await attemptCommunityPuzzleAction(puzzleId, result, userAnswer.trim());
    if(response.success){
      router.refresh()
    } else {
      toast.error(response.message);
    }
    setShowHint(false);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Quick attempt</p>
          <span
            onClick={() => setShowHint((prev) => !prev)}
            className="cursor-pointer rounded-full bg-yellow-50 px-3 py-1 text-[11px] font-semibold text-yellow-700 ring-1 ring-yellow-100"
          >
            {showHint ? "Hide" : "Show"} hint
          </span>
        </div>
        {prevResult ? (
          prevResult === "correct" ? (
            <AnswerCard
              type="success"
              answers={answers}
              outline={solutionOutline}
            />
          ) : (
            <AnswerCard
              type="error"
              answers={answers}
              outline={solutionOutline}
            />
          )
        ) : (
          <></>
        )}

        {showHint && (
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Hint
            </p>
            <div className="mt-2 text-sm text-amber-900">
              <MarkdownRenderer text={hint} />
            </div>
          </div>
        )}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          readOnly={hasAttempted}
          placeholder="Share your answer"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
        />
        <button
          onClick={handleAttemptPuzzle}
          type="button"
          disabled={loading || hasAttempted}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow ${
            loading || hasAttempted
              ? "cursor-not-allowed opacity-60"
              : "hover:bg-cyan-700 cursor-pointer"
          }`}
        >
          <FaCheckCircle />
          {loading ? (
            <LoadingSpinner
              color="border-white"
              thickness="border-2"
              size="size-4"
            />
          ) : prevResult ? (
            "Attempt submitted"
          ) : (
            "Submit attempt"
          )}
        </button>
        <p className="text-xs text-gray-600">
          Attempts and correct attempts are tracked with the puzzle so you can
          see how many solvers made it through.
        </p>
      </div>
    </div>
  );
};

export default Attempt;
