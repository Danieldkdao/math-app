import Link from "next/link";
import MarkdownRenderer from "@/components/General/markdown-renderer";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaComments,
  FaExclamationTriangle,
  FaFlag,
  FaStar,
} from "react-icons/fa";
import { FaLayerGroup, FaUser } from "react-icons/fa6";
import { connectDB } from "@/db/db";
import mongoose from "mongoose";
import communityPuzzleModel from "@/db/schemas/community-puzzle-model";
import type { MathCommunityPuzzle } from "@/lib/types";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";
import PostComment from "@/components/Dashboard/community/puzzles/post-comment";
import RatePuzzle from "@/components/Dashboard/community/puzzles/rate-puzzle";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import Flag from "@/components/Dashboard/community/puzzles/flag";
import Attempt from "@/components/Dashboard/community/puzzles/attempt";

const CommunityPuzzleDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  const { id } = await params;
  await connectDB();
  const validIdChecker = mongoose.Types.ObjectId;
  if (!validIdChecker.isValid(id))
    return (
      <div className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
            <FaExclamationTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Puzzle not found
            </h1>
            <p className="text-sm text-gray-700 max-w-2xl mx-auto">
              The puzzle you’re looking for doesn’t exist or the link is broken.
              Check the URL or return to the community puzzles to browse active
              challenges.
            </p>
          </div>
          <Link
            href="/user/community/puzzles"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-cyan-700"
          >
            <FaArrowLeft />
            Back to community puzzles
          </Link>
        </div>
      </div>
    );
  const puzzleData = await communityPuzzleModel.findById(id);
  if (!puzzleData)
    return (
      <div className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
            <FaExclamationTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Puzzle not found
            </h1>
            <p className="text-sm text-gray-700 max-w-2xl mx-auto">
              The puzzle you’re looking for doesn’t exist or our database is
              down. Check the URL or return to the community puzzles to browse
              active challenges.
            </p>
          </div>
          <Link
            href="/user/community/puzzles"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-cyan-700"
          >
            <FaArrowLeft />
            Back to community puzzles
          </Link>
        </div>
      </div>
    );
  const puzzle: MathCommunityPuzzle = JSON.parse(JSON.stringify(puzzleData));
  const rating =
    puzzle.ratings.find((item) => item.user === session.user.id) || null;
  const flag =
    puzzle.flags.find((item) => item.user === session.user.id) || null;
  const attempt =
    puzzle.attempts.find((item) => item.user === session.user.id) || null;
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-8 px-4 py-8">
        <header className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link
              href="/user/community/puzzles"
              className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
            >
              <FaArrowLeft />
              Back to puzzles
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
              <FaLayerGroup className="text-cyan-600" />
              Community puzzle
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              <MarkdownRenderer text={puzzle.title} />
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span className="rounded-full bg-gray-50 px-3 py-1 font-semibold ring-1 ring-gray-200">
                By {puzzle.user.name}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">
                {puzzle.difficulty}
              </span>
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700 ring-1 ring-cyan-100">
                {puzzle.category}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-gray-800">
            <span className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
              <FaStar className="text-amber-500" />
              {(puzzle.ratings.reduce((a, b) => a + b.rating, 0) /
                (puzzle.ratings.length || 1)).toFixed(1)}{" "}
              avg {puzzle.ratings.length} ratings
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
              <FaComments className="text-cyan-600" />
              {puzzle.comments.length} comments
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
              <FaCheckCircle className="text-emerald-600" />
              {
                puzzle.attempts.filter((item) => item.result === "correct")
                  .length
              }{" "}
              / {puzzle.attempts.length} correct
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
              <FaFlag className="text-amber-600" />
              {puzzle.flags.length} flags
            </span>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <div className="text-lg font-semibold text-gray-900">Problem</div>
              <div className="text-base text-gray-800 leading-relaxed">
                <MarkdownRenderer text={puzzle.problemText} />
              </div>
            </div>
          </article>

          <aside className="space-y-4">
            <Attempt
              puzzleId={puzzle._id}
              prevAnswer={attempt?.answer}
              prevResult={attempt?.result}
              answers={puzzle.answers}
              hint={puzzle.hint}
              solutionOutline={puzzle.solutionOutline}
            />

            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  Rate this puzzle
                </p>
                <span className="text-xs font-semibold text-gray-600">
                  {(puzzle.ratings.reduce((a, b) => a + b.rating, 0) /
                    (puzzle.ratings.length || 1)).toFixed(1)}{" "}
                  avg {puzzle.ratings.length} ratings
                </span>
              </div>
              <RatePuzzle
                puzzleId={puzzle._id}
                hasRated={rating ? true : false}
                prevRating={rating?.rating}
              />
              <p className="text-xs text-gray-600">
                Ratings are stored with each puzzle so others can gauge clarity
                and difficulty.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Comments</p>
                <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
                  {puzzle.comments.length} responses
                </span>
              </div>
              <div className="space-y-3 max-h-72 overflow-auto">
                {puzzle.comments.reverse().map((comment) => (
                  <div
                    key={comment._id}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      {comment.author.image ? (
                        <Image
                          src={comment.author.image}
                          alt="Author profile image"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-gray-900 text-white">
                          <FaUser />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                          {comment.author.name}
                          <span className="text-gray-500">·</span>
                          <span className="text-xs font-normal text-gray-500">
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PostComment puzzleId={puzzle._id} />
            </div>

            <Flag
              puzzleId={puzzle._id}
              hasFlagged={flag ? true : false}
              flagMessage={flag?.reason}
            />
          </aside>
        </section>
      </div>
    </div>
  );
};

export default CommunityPuzzleDetailPage;
