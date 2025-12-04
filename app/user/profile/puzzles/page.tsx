import Link from "next/link";
import {
  FaArrowLeft,
  FaPuzzlePiece,
  FaStar,
  FaComments,
} from "react-icons/fa6";
import { FaClock, FaFlag } from "react-icons/fa";
import { connectDB } from "@/db/db";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import communityPuzzleModel from "@/db/schemas/community-puzzle-model";
import type { MathCommunityPuzzle } from "@/lib/types";
import MarkdownRenderer from "@/components/General/markdown-renderer";

const UserPuzzlesPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  await connectDB();
  const data = await communityPuzzleModel
    .find({ "user.id": session.user.id })
    .sort({ createdAt: -1, _id: -1 });
  const puzzles: MathCommunityPuzzle[] = data.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[1000px] bg-gray-50 rounded-md border border-gray-400 p-6 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/user/profile">
            <div className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <FaArrowLeft />
              Back to profile
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Your Community Puzzles
          </h1>
        </div>

        {puzzles.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-700">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
              <FaPuzzlePiece className="text-cyan-700" />
              You haven&apos;t published any puzzles yet
            </div>
            <p className="text-sm text-gray-600">
              Share your first community puzzle to get ratings, comments, and
              attempts from other solvers.
            </p>
            <Link
              href="/user/community/puzzles/create"
              className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-700"
            >
              Publish a puzzle
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {puzzles.map((puzzle) => (
              <div
                key={puzzle._id}
                className="rounded-md border border-gray-300 bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <FaPuzzlePiece className="text-cyan-700" />
                    {puzzle.title}
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-semibold">
                    {puzzle.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <MarkdownRenderer text={puzzle.problemText} />
                </div>
                <div className="text-xs text-gray-700 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                  <div className="max-h-40 overflow-auto">
                    <strong>Hint:</strong>{" "}
                    <MarkdownRenderer text={puzzle.hint} />
                  </div>
                  <div className="max-h-40 overflow-auto">
                    <strong>Outline:</strong>{" "}
                    <MarkdownRenderer text={puzzle.solutionOutline} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
                  <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                    {puzzle.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    <FaStar className="text-amber-500" />
                    {(puzzle.ratings.reduce((a, b) => a + b.rating, 0) / puzzle.ratings.length).toFixed(1)} /{" "}
                    {puzzle.ratings.length}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    <FaClock className="text-gray-500" />
                    {puzzle.attempts.filter(item => item.result === "correct").length} / {puzzle.attempts.length}{" "}
                    correct
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    <FaComments className="text-gray-500" />
                    {puzzle.comments.length} comments
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    <FaFlag className="text-amber-500" />
                    {puzzle.flags.length} flags
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPuzzlesPage;
