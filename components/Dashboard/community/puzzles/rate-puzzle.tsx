"use client";

import LoadingSpinner from "@/components/General/loading-spinner";
import { saveUpdateRatingAction } from "@/lib/actions";
import type { RatingNum } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";

const RatePuzzle = ({
  puzzleId,
  hasRated: rated,
  prevRating,
}: {
  puzzleId: string;
  hasRated: boolean;
  prevRating: RatingNum | undefined,
}) => {
  const [currentRating, setCurrentRating] = useState<0 | RatingNum>(prevRating || 0);
  const [loading, setLoading] = useState(false);
  const [hasRated, setHasRated] = useState(rated);
  const router = useRouter();

  const handleSaveRating = async () => {
    setLoading(true);
    setHasRated(false);
    if (currentRating === 0) {
      toast.error("Please select a rating.");
      setLoading(false);
      return;
    }
    const response = await saveUpdateRatingAction(
      puzzleId,
      currentRating as RatingNum,
      rated
    );
    if (response.success) {
      toast.success(response.message);
      setHasRated(true);
      router.refresh();
    } else {
      toast.error(response.message);
      setHasRated(true);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isSelect = currentRating >= star;
          return (
            <button
              disabled={loading || hasRated}
              key={star}
              type="button"
              onClick={() => setCurrentRating(star as RatingNum)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-sm ${hasRated ? "cursor-not-allowed" : "cursor-pointer"} ${
                loading || (hasRated && "opacity-60")
              } ${
                isSelect
                  ? `bg-amber-500 ${!rated && "hover:bg-amber-600"} text-white`
                  : `border ${!rated && "hover:bg-gray-100"} border-gray-200 bg-gray-50 text-amber-500`
              }`}
            >
              <FaStar />
            </button>
          );
        })}
      </div>
      <button
        disabled={loading}
        onClick={hasRated ? () => setHasRated(false) : handleSaveRating}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold shadow ${
          loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-gray-50 cursor-pointer"
        } text-black border border-gray-200`}
      >
        {loading ? (
          <LoadingSpinner
            color="border-black"
            thickness="border-2"
            size="size-4"
          />
        ) : hasRated ? (
          "Edit rating"
        ) : (
          "Save rating"
        )}
      </button>
    </div>
  );
};

export default RatePuzzle;
