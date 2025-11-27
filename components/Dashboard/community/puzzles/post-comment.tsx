"use client";
import LoadingSpinner from "@/components/General/loading-spinner";
import { postCommentPuzzleAction } from "@/lib/actions";
import { authClient } from "@/lib/auth/auth-client";
import type { Author } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaComments } from "react-icons/fa6";

const PostComment = ({ puzzleId }: { puzzleId: string }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (session == null) return;

  const handlePostComment = async () => {
    setLoading(true);
    if (!comment.trim()) {
      toast.error("Comment cannot be empty.");
      setLoading(false);
      return;
    };
    const user: Author = {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
    };
    const response = await postCommentPuzzleAction(puzzleId, comment, user);
    if (response.success) {
      setComment("");
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder="Leave a note for the creator or other solvers"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
      />
      <button
        disabled={loading}
        onClick={handlePostComment}
        type="button"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm ${
          loading
            ? "cursor-not-allowed opacity-60"
            : "hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <FaComments className="text-cyan-600" />
        {loading ? (
          <LoadingSpinner
            color="border-black"
            thickness="border-2"
            size="size-4"
          />
        ) : (
          "Post comment"
        )}
      </button>
      <p className="text-xs text-gray-600">
        Comments live alongside the puzzle so feedback and discussion stay in
        one place.
      </p>
    </div>
  );
};

export default PostComment;
