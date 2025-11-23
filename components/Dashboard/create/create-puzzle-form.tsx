"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  FaPlus,
  FaRegClock,
  FaRocket,
  FaTrash,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { mathPuzzleDifficultyLevels, mathPuzzleCategories } from "@/lib/utils";
import type {
  MathPuzzle,
  MathPuzzleCategory,
  MathPuzzleDifficultyLevel,
} from "@/lib/types";
import { z } from "zod";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import {
  createSavePuzzleDraftAction,
  publishCommunityMathPuzzleAction,
} from "@/lib/actions";
import LoadingSpinner from "@/components/General/loading-spinner";

const PuzzleEditor = dynamic(
  () => import("@/components/Dashboard/create/PuzzleEditor"),
  {
    ssr: false,
  }
);

const CreatePuzzleForm = () => {
  const [puzzleFields, setPuzzleFields] = useState<
    Pick<MathPuzzle, "title" | "difficulty" | "category">
  >({
    title: "",
    difficulty: "Easy",
    category: "Algebra",
  });
  const [answers, setAnswers] = useState<string[]>([""]);
  const [problemText, setProblemText] = useState("");
  const [hint, setHint] = useState("");
  const [solutionOutline, setSolutionOutline] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (session == null) return;

  const convertBackslashes = (text: string) => {
    return text.replace("\\", "\\\\");
  };

  const newPuzzle = {
    title: puzzleFields.title,
    difficulty: puzzleFields.difficulty,
    category: puzzleFields.category,
    answers,
    problemText: convertBackslashes(problemText),
    hint: convertBackslashes(hint),
    solutionOutline: convertBackslashes(solutionOutline),
    user: session.user.id,
  };

  const handlePublishNewPuzzle = async () => {
    const validatePuzzle = z.object({
      title: z.string().trim().min(1, "Title must be at least one character."),
      difficulty: z.enum(mathPuzzleDifficultyLevels),
      category: z.enum(mathPuzzleCategories),
      answers: z
        .array(z.string().trim().min(1, "Answers cannot be empty."))
        .min(1, "You must add at least one answer."),
      problemText: z
        .string()
        .trim()
        .min(1, "Problem text must be at least one character"),
      hint: z.string().trim().min(1, "Hint must be at least one character."),
      solutionOutline: z
        .string()
        .trim()
        .min(1, "Solution outline must be at least one character."),
      user: z.string(),
    });
    const valid = validatePuzzle.safeParse(newPuzzle);
    if (!valid.success) return toast.error(valid.error.issues[0].message);
    setLoading(true);
    const response = await publishCommunityMathPuzzleAction(newPuzzle);
    if (response.success) {
      toast.success(response.message);
      reset();
      router.push("/user/community/puzzles");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const handleCreateSaveDraft = async () => {
    setLoading(true);
    const response = await createSavePuzzleDraftAction(newPuzzle);
    if (response.success) {
      toast.success(response.message);
      router.push("/user/profile");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const reset = () => {
    setPuzzleFields({ title: "", difficulty: "Easy", category: "Algebra" });
    setAnswers([]);
    setProblemText("");
    setHint("");
    setSolutionOutline("");
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Puzzle details
            </h2>
            <p className="text-sm text-gray-600">
              Give your puzzle a name and a quick overview.
            </p>
          </div>
          <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
            Required
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <label className="space-y-2 text-sm font-semibold text-gray-800">
            Title
            <input
              value={puzzleFields.title}
              onChange={(e) =>
                setPuzzleFields((prev) => ({ ...prev, title: e.target.value }))
              }
              type="text"
              placeholder="e.g. A curious path through primes"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-gray-800">
              Difficulty
              <select
                value={puzzleFields.difficulty}
                onChange={(e) =>
                  setPuzzleFields((prev) => ({
                    ...prev,
                    difficulty: e.target.value as MathPuzzleDifficultyLevel,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-700"
              >
                {mathPuzzleDifficultyLevels.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="space-y-2 text-sm font-semibold text-gray-800">
              Category
              <select
                value={puzzleFields.category}
                onChange={(e) =>
                  setPuzzleFields((prev) => ({
                    ...prev,
                    category: e.target.value as MathPuzzleCategory,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-700"
              >
                {mathPuzzleCategories.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Problem statement
            </h2>
            <p className="text-sm text-gray-600">
              State the challenge clearly and include any constraints or
              additional details.
            </p>
          </div>
          <FaLightbulb className="text-amber-500" />
        </div>
        <PuzzleEditor
          value={problemText}
          onChange={(val) => setProblemText(val || "")}
          placeholder="Describe the puzzle, givens, and what solvers should produce..."
        />
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Hints and solution sketch
          </h2>
          <FaWandMagicSparkles className="text-purple-500" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800 mb-2">
            Answer/s
          </label>
          <button
            onClick={() => setAnswers((prev) => [...prev, ""])}
            className="bg-cyan-600 rounded-lg p-2 cursor-pointer text-white hover:bg-cyan-700 flex items-center gap-2 text-sm"
          >
            <FaPlus />
            Add answer
          </button>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {answers.map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    setAnswers((prev) =>
                      prev.map((answer, i) => {
                        if (i === index) {
                          return e.target.value;
                        }
                        return answer;
                      })
                    )
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
                <button
                  disabled={index === 0}
                  onClick={() =>
                    setAnswers((prev) =>
                      prev.filter((answer, i) => i !== index)
                    )
                  }
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                >
                  <FaTrash color="red" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Hints
            </label>
            <PuzzleEditor
              value={hint}
              onChange={(val) => setHint(val || "")}
              placeholder="Share 1-3 hints that gradually guide solvers toward the key idea."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              Solution outline
            </label>
            <PuzzleEditor
              value={solutionOutline}
              onChange={(val) => setSolutionOutline(val || "")}
              placeholder="Outline the main steps; bullet points work great."
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          disabled={loading}
          onClick={handlePublishNewPuzzle}
          className={`inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow transition ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-cyan-700 cursor-pointer"
          }`}
        >
          <FaRocket />
          {loading ? (
            <LoadingSpinner
              color="border-white"
              size="size-4"
              thickness="border-2"
            />
          ) : (
            "Publish to community"
          )}
        </button>
        <button
          disabled={loading}
          onClick={handleCreateSaveDraft}
          className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm ${
            loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <FaRegClock />
          {loading ? (
            <LoadingSpinner
              color="border-black"
              size="size-4"
              thickness="border-2"
            />
          ) : (
            "Save as draft"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePuzzleForm;
