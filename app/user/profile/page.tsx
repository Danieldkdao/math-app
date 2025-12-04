import SessionCard from "@/components/Dashboard/user-profile/training-history/session-card";
import ProfileCharts from "@/components/Dashboard/user-profile/profile-charts";
import { connectDB } from "@/db/db";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";
import { auth } from "@/lib/auth/auth";
import {
  type ChatSession,
  type MathCommunityPuzzle,
  type MathCommunityPuzzleDraft,
  type PopulatedPuzzleSession,
  type Thread,
} from "@/lib/types";
import { formatTime, timeAgo } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCircleUser,
  FaComments,
  FaPuzzlePiece,
  FaMessage,
  FaPenNib,
} from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import chatSessionModel from "@/db/schemas/chat-session-model";
import threadModel from "@/db/schemas/thread-model";
import communityPuzzleModel from "@/db/schemas/community-puzzle-model";
import puzzleDraftModel from "@/db/schemas/puzzle-draft-model";
import ListRecentChats from "@/components/Dashboard/user-profile/ai-chats/list-recent-chats";
import MarkdownRenderer from "@/components/General/markdown-renderer";

const UserProfile = async () => {
  await connectDB();
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session || session == null) return;

  const puzzleData = await puzzleSessionModel
    .find({
      user: session.user.id,
    })
    .populate({
      path: "puzzleHistory",
      populate: {
        path: "puzzleId",
        model: "MathPuzzles",
      },
    })
    .sort({ createdAt: -1, _id: -1 });
  // if (!puzzleSessionHistory) {
  //   return (
  //     <div className="w-full flex justify-center">
  //       <div className="w-full max-w-[800px] bg-gray-100 rounded-md border border-gray-400 p-5 space-y-4">
  //         <h1 className="text-2xl font-bold text-center">Failed to retrieve user data</h1>
  //         <p className="text-gray-600 text-center">Unfortunately, at this time we could not retrive the details of your profile. Please come back later and check for updates.</p>
  //       </div>
  //     </div>
  //   );
  // }
  const aiChatsData = await chatSessionModel
    .find({ user: session.user.id })
    .sort({ createdBy: -1, _id: -1 })
    .limit(3);
  const threadsData = await threadModel
    .find({ startedBy: session.user.id })
    .sort({ createdBy: -1, _id: -1 })
    .limit(3);
  const puzzlesData = await communityPuzzleModel
    .find({
      "user.id": session.user.id,
    })
    .sort({ createdBy: -1, _id: -1 })
    .limit(3);
  const puzzleDraftsData = await puzzleDraftModel
    .find({
      "user.id": session.user.id,
    })
    .sort({ createdBy: -1, _id: -1 })
    .limit(3);
  const aiChats: ChatSession[] = aiChatsData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const threads: Thread[] = threadsData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const communityPuzzles: MathCommunityPuzzle[] = puzzlesData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const communityPuzzleDrafts: MathCommunityPuzzleDraft[] =
    puzzleDraftsData.map((item) => JSON.parse(JSON.stringify(item)));
  const puzzleSessionHistory: PopulatedPuzzleSession[] = puzzleData.map(
    (item) => JSON.parse(JSON.stringify(item))
  );

  const performanceOverview = [
    {
      title: "Total Puzzles",
      value: puzzleSessionHistory.reduce(
        (a, b) =>
          a +
          b.puzzleHistory.filter((item) => item.result === "correct").length,
        0
      ),
      description: "(Lifetime Puzzles Solved)",
    },
    {
      title: "Accuracy",
      value:
        puzzleSessionHistory.reduce(
          (a, b) =>
            a +
            b.puzzleHistory.filter((item) => item.result !== "skipped").length,
          0
        ) > 0
          ? `${Math.round(
              (puzzleSessionHistory.reduce(
                (a, b) =>
                  a +
                  b.puzzleHistory.filter((item) => item.result === "correct")
                    .length,
                0
              ) /
                puzzleSessionHistory.reduce(
                  (a, b) =>
                    a +
                    b.puzzleHistory.filter((item) => item.result !== "skipped")
                      .length,
                  0
                )) *
                100
            )}%`
          : "Unavailable",
      description: "(Overall Correct Solution Rate)",
    },
    {
      title: "Avg Time",
      value:
        puzzleSessionHistory.reduce(
          (a, b) =>
            a +
            b.puzzleHistory.filter((item) => item.result !== "skipped").length,
          0
        ) > 0
          ? `${(
              puzzleSessionHistory.reduce(
                (a, b) =>
                  a +
                  b.puzzleHistory
                    .filter((item) => item.result !== "skipped")
                    .reduce((a, b) => a + b.timeSpent, 0),
                0
              ) /
              puzzleSessionHistory.reduce(
                (a, b) =>
                  a +
                  b.puzzleHistory.filter((item) => item.result !== "skipped")
                    .length,
                0
              )
            ).toFixed(1)} sec`
          : "Unavailable",
      description: "(Average Time per Puzzle)",
    },
    {
      title: "Current Rank",
      value: "Master I",
      description: "(Global standing based on skill)",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[900px] bg-gray-50 rounded-md border border-gray-400 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="user profile image"
              width={105}
              height={105}
              className="rounded-full border-4 border-cyan-800"
            />
          ) : (
            <div className="shrink-0">
              <FaCircleUser
                size={105}
                className="rounded-full border-4 border-cyan-800"
              />
            </div>
          )}
          <div className="w-full">
            <div className="flex gap-4 items-center flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold">{session.user.name}</h1>
              <p className="py-0.5 px-2 rounded-md border border-cyan-800 bg-cyan-50 text-gray-600 font-medium text-sm">
                Free
              </p>
              <p className="py-0.5 px-2 rounded-md border border-cyan-800 bg-cyan-50 text-gray-600 font-medium text-sm">
                Joined on {formatTime(session.user.createdAt).date} at{" "}
                {formatTime(session.user.createdAt).time}
              </p>
            </div>
            <p className="text-gray-600 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              nobis sed fugiat perferendis, dolor facilis placeat! Molestiae
              eligendi maxime suscipit placeat quisquam, omnis labore voluptates
              nobis rem nulla. Ratione, explicabo!
            </p>
          </div>
        </div>
        <hr className="text-gray-400" />
        <h1 className="text-2xl font-bold">ALL TIME STATS</h1>
        <hr className="text-gray-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceOverview.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 border border-gray-400 rounded-md p-4"
              >
                <h1 className="text-xl text-center font-medium text-gray-600">
                  {item.title}
                </h1>
                <h1 className="text-lg font-bold text-center text-gray-500">
                  {item.value}
                </h1>
                <p className="text-gray-500 text-center">{item.description}</p>
              </div>
            );
          })}
        </div>
        <hr className="text-gray-400" />
        <h1 className="text-2xl font-bold">PERFORMANCE INSIGHTS</h1>
        <ProfileCharts sessionHistory={puzzleSessionHistory} />
        <hr className="text-gray-400" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">RECENT SESSIONS</h1>
          <Link href="/user/profile/session-history">
            {puzzleSessionHistory.length > 0 && (
              <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
                <p className="text-lg font-medium">View All</p>
                <FaArrowRight />
              </div>
            )}
          </Link>
        </div>
        {puzzleSessionHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {puzzleSessionHistory.slice(0, 3).map((item) => {
              return <SessionCard puzzleSession={item} key={item._id} />;
            })}
          </div>
        ) : (
          <h1 className="text-xl font-medium text-gray-600 text-center">
            No recent sessions found.
          </h1>
        )}
        <hr className="text-gray-400" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">YOUR RECENT AI CHATS</h1>
          <Link href="/user/community/ai-math-chat">
            {aiChats.length > 0 && (
              <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
                <p className="text-lg font-medium">Go to AI Math Chat</p>
                <FaArrowRight />
              </div>
            )}
          </Link>
        </div>
        {aiChats.length > 0 ? (
          <ListRecentChats aiChats={aiChats} />
        ) : (
          <h1 className="text-xl font-medium text-gray-600 text-center">
            No recent AI chats found.
          </h1>
        )}
        <hr className="text-gray-400" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">YOUR RECENT THREADS</h1>
          <Link href="/user/profile/threads">
            {threads.length > 0 && (
              <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
                <p className="text-lg font-medium">View all threads</p>
                <FaArrowRight />
              </div>
            )}
          </Link>
        </div>
        {threads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {threads.map((thread) => (
              <Link
                key={thread._id}
                href={`/user/community/discussions/thread/${thread._id}`}
              >
                <div className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white">
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaComments className="text-cyan-700" />
                      {thread.title}
                    </span>
                    <span className="text-gray-500">
                      {timeAgo(thread.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {thread.threadPrompt}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                    <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                      {thread.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaMessage className="text-gray-500" />
                      {thread.replies.length} replies
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium text-gray-600 text-center">
            No recent threads found.
          </h1>
        )}
        <hr className="text-gray-400" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">YOUR COMMUNITY PUZZLES</h1>
          <Link href="/user/profile/puzzles">
            {communityPuzzles.length > 0 && (
              <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
                <p className="text-lg font-medium">View all puzzles</p>
                <FaArrowRight />
              </div>
            )}
          </Link>
        </div>
        {communityPuzzles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityPuzzles.map((puzzle) => (
              <div
                key={puzzle._id}
                className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white"
              >
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2">
                    <FaPuzzlePiece className="text-cyan-700" />
                    {puzzle.title}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    {puzzle.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {puzzle.problemText}
                </p>
                <div className="text-xs font-semibold text-gray-600 flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                    {puzzle.category}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    {puzzle.ratings.reduce((a, b) => a + b.rating, 0)}★ /{" "}
                    {puzzle.ratings.length}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    {puzzle.attempts.filter(item => item.result === "correct").length} correct of{" "}
                    {puzzle.attempts.length}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    {puzzle.comments.length} comments
                  </span>
                  <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                    {puzzle.flags.length} flags
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                  <div className="max-h-40 overflow-auto">
                    <strong>Hint:</strong> <MarkdownRenderer text={puzzle.hint} />
                  </div>
                  <div className="max-h-40 overflow-auto">
                    <strong>Outline:</strong> <MarkdownRenderer text={puzzle.solutionOutline} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium text-gray-600 text-center">
            No community puzzles published yet.
          </h1>
        )}
        <hr className="text-gray-400" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">YOUR PUZZLE DRAFTS</h1>
          <Link href="/user/profile/puzzles/drafts">
            {communityPuzzleDrafts.length > 0 && (
              <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
                <p className="text-lg font-medium">View all drafts</p>
                <FaArrowRight />
              </div>
            )}
          </Link>
        </div>
        {communityPuzzleDrafts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityPuzzleDrafts.map((draft) => (
              <Link
                href={`/user/community/puzzles/create?draft=${draft._id}`}
                key={draft._id}
              >
                <div className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white">
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaPenNib className="text-cyan-700" />
                      {draft.title}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      {draft.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {draft.problemText}
                  </p>
                  <div className="text-xs font-semibold text-gray-600 flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                      {draft.category}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                      {draft.answers.length} answer(s)
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                    <div className="max-h-40 overflow-auto">
                      <strong>Hint:</strong>{" "}
                      <MarkdownRenderer text={draft.hint} />
                    </div>
                    <div className="max-h-40 overflow-auto">
                      <strong>Outline:</strong>{" "}
                      <MarkdownRenderer text={draft.solutionOutline} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <FaClock className="text-gray-500" />
                      Updated {timeAgo(draft.updatedAt)}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-white ring-1 ring-gray-200 text-gray-700">
                      Draft fields shown
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium text-gray-600 text-center">
            No puzzle drafts found.
          </h1>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
