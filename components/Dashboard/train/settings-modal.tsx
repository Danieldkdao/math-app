"use client";

import LoadingSpinner from "@/components/General/loading-spinner";
import Modal from "@/components/General/modal";
import ToggleSwitch from "@/components/General/toggle-switch";
import { useModal } from "@/hooks/useModal";
import { useTrain } from "@/hooks/useTrain";
import { fetchPuzzlesAction } from "@/lib/actions";
import { MathPuzzleCategory, MathPuzzleDifficultyLevels } from "@/lib/types";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const SettingsForm = z.object({
  timeLimitPerPuzzle: z
    .number({ error: "Time limit must be a valid integer." })
    .int()
    .min(1, { error: "Time limit must be at least 1 second per question." })
    .max(600, {
      error: "Cannot have time limit greater than 10 minutes per question.",
    })
    .nullable(),
  hints: z.boolean(),
  skips: z.boolean(),
  numberOfPuzzles: z
    .number({ error: "Number of puzzles must be valid integer." })
    .int()
    .min(1, { error: "Number of puzzles must be at least 1." })
    .max(100, { error: "Number of puzzles cannot be greater than 100." }),
});

type SettingsFormType = z.infer<typeof SettingsForm>;

const SettingsModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsForm),
    defaultValues: {
      hints: true,
      skips: true,
    },
  });
  const [selectedCategories, setSelectedCategories] = useState<
    MathPuzzleCategory[]
  >([]);
  const [selectedDifficultyLevels, setSelectedDifficultyLevels] = useState<
    MathPuzzleDifficultyLevels[]
  >([]);
  const { setIsModalOpen } = useModal();
  const { setTrainPuzzles, setUserSettings } = useTrain();

  const startSession = async (formData: SettingsFormType) => {
    const puzzles = await fetchPuzzlesAction(
      selectedCategories,
      selectedDifficultyLevels,
      formData.numberOfPuzzles
    );
    if (!puzzles || puzzles.length === 0)
      return toast.error("No puzzles found.");
    setTrainPuzzles(puzzles);
    const categories =
      selectedCategories.length === 0
        ? mathPuzzleCategories
        : selectedCategories;
    const difficultyLevels =
      selectedDifficultyLevels.length === 0
        ? mathPuzzleDifficultyLevels
        : selectedDifficultyLevels;
    setUserSettings({
      ...formData,
      selectedCategories: categories,
      selectedDifficultyLevels: difficultyLevels,
      numberOfPuzzles: puzzles.length,
    });
    setIsModalOpen(false);
    reset();
  };

  return (
    <Modal callback={() => redirect("/user/dashboard")}>
      <div className="bg-white w-full max-w-[500px] rounded-md p-5 space-y-2">
        <h1 className="text-xl font-semibold">Settings</h1>
        <hr className="text-gray-400" />
        <div className="space-y-2">
          <h2 className="text-gray-600 font-medium">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {mathPuzzleCategories.map((item, index) => {
              const isSelected = selectedCategories.find(
                (category) => item === category
              );
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (
                      selectedCategories.find((category) => category === item)
                    ) {
                      setSelectedCategories((prev) =>
                        prev.filter((category) => category !== item)
                      );
                    } else {
                      setSelectedCategories((prev) => [...prev, item]);
                    }
                  }}
                  className={`py-1 px-2 rounded-md border text-gray-600 cursor-pointer hover:bg-cyan-50 active:scale-[98%] transition-color duration-100 ease-in-out text-sm ${
                    isSelected
                      ? "border-cyan-800 bg-cyan-100"
                      : "border-gray-400 bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <hr className="text-gray-400" />
        <div className="space-y-2">
          <h2 className="text-gray-600 font-medium">Difficulty Level</h2>
          <div className="flex flex-wrap gap-2">
            {mathPuzzleDifficultyLevels.map((item, index) => {
              const isSelected = selectedDifficultyLevels.find(
                (level) => item === level
              );
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (
                      selectedDifficultyLevels.find((level) => level === item)
                    ) {
                      setSelectedDifficultyLevels((prev) =>
                        prev.filter((level) => level !== item)
                      );
                    } else {
                      setSelectedDifficultyLevels((prev) => [...prev, item]);
                    }
                  }}
                  className={`py-1 px-2 rounded-md border text-gray-600 cursor-pointer hover:bg-cyan-50 active:scale-[98%] transition-color duration-100 ease-in-out text-sm ${
                    isSelected
                      ? "border-cyan-800 bg-cyan-100"
                      : "border-gray-400 bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <hr className="text-gray-400" />
        <div className="space-y-4">
          <h2 className="text-gray-600 font-medium">Configuration</h2>
          <form onSubmit={handleSubmit(startSession)} className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="time-limit" className="text-sm text-gray-600">
                  Time Limit per Puzzle:
                </label>
                <div className="flex items-end gap-2">
                  <input
                    {...register("timeLimitPerPuzzle", {
                      setValueAs: (v) => (v.trim() === "" ? null : Number(v)),
                    })}
                    type="number"
                    id="time-limit"
                    className="outline-0 border border-b-4 border-b-cyan-800 border-gray-400 p-2 w-full max-w-20"
                  />
                  <p className="text-sm text-gray-600">sec</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="num-puzzles" className="text-sm text-gray-600">
                  Number of Puzzles:
                </label>
                <div className="flex items-end gap-2">
                  <input
                    {...register("numberOfPuzzles", {
                      setValueAs: (v) => (v.trim() === "" ? null : Number(v)),
                    })}
                    type="number"
                    id="num-puzzles"
                    className="outline-0 border border-b-4 border-b-cyan-800 border-gray-400 p-2 w-full max-w-20"
                  />
                  <p className="text-sm text-gray-600">puzzles</p>
                </div>
              </div>
            </div>
            {errors.timeLimitPerPuzzle && (
              <p className="text-xs text-red-500">
                {errors.timeLimitPerPuzzle.message}
              </p>
            )}
            {errors.numberOfPuzzles && (
              <p className="text-xs text-red-500">
                {errors.numberOfPuzzles.message}
              </p>
            )}
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="hints" className="text-sm text-gray-600">
                  Allow hints:
                </label>
                <ToggleSwitch id="hints" register={register} name="hints" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="skips" className="text-sm text-gray-600">
                  Allow skips:
                </label>
                <ToggleSwitch id="skips" register={register} name="skips" />
              </div>
            </div>
            <hr className="text-gray-400" />
            <button
              disabled={isSubmitting}
              className={`py-2 px-10 border border-cyan-800 rounded-md bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300 ease-in-out cursor-pointer flex ${
                isSubmitting && "opacity-60"
              }`}
            >
              {isSubmitting ? (
                <LoadingSpinner
                  color="border-cyan-800"
                  thickness="border-4"
                  size="size-6"
                />
              ) : (
                "Start"
              )}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
