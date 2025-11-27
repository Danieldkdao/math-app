"use client";
import LoadingSpinner from "@/components/General/loading-spinner";
import { saveUpdateFlagAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFlag } from "react-icons/fa6";

const Flag = ({
  puzzleId,
  hasFlagged: flagged,
  flagMessage,
}: {
  puzzleId: string;
  hasFlagged: boolean;
  flagMessage: string | undefined;
}) => {
  const [flagReason, setFlagReason] = useState(flagMessage || "");
  const [loading, setLoading] = useState(false);
  const [hasFlagged, setHasFlagged] = useState(flagged);
  const router = useRouter();

  const handleSaveFlag = async () => {
    setLoading(true);
    if (!flagReason.trim()) {
      toast.error("You must provide a flag reason.");
      setLoading(false);
      return;
    }
    const response = await saveUpdateFlagAction(puzzleId, flagged, flagReason);
    if (response.success) {
      toast.success(response.message);
      setHasFlagged(true);
      router.refresh();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-amber-900">
        <FaFlag />
        Flag this puzzle
      </div>
      <p className="text-sm text-amber-900">
        If something looks off, flag it for review. Flags are stored with the
        puzzle so moderators can check issues quickly.
      </p>
      <input
        value={flagReason}
        onChange={(e) => setFlagReason(e.target.value)}
        readOnly={hasFlagged}
        type="text"
        placeholder="State the flag reason"
        className={`w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 ${hasFlagged && "opacity-60"}`}
      />
      <button
        onClick={hasFlagged ? () => setHasFlagged(false) : handleSaveFlag}
        type="button"
        disabled={loading}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white shadow ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-amber-700 cursor-pointer"}`}
      >
        {loading ? (
          <LoadingSpinner
            color="border-white"
            thickness="border-2"
            size="size-4"
          />
        ) : hasFlagged ? (
          "Edit flag reason"
        ) : (
          "Submit a flag"
        )}
      </button>
    </div>
  );
};

export default Flag;
