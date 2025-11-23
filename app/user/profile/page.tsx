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
      user: session.user.id,
    })
    .sort({ createdBy: -1, _id: -1 })
    .limit(3);
  const puzzleDraftsData = await puzzleDraftModel
    .find({
      user: session.user.id,
    })
    .sort({ createdBy: -1, _id: -1 })
    .limit(3);
  const aiChats: ChatSession[] = aiChatsData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const threads: Thread[] = threadsData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const puzzles: MathCommunityPuzzle[] = puzzlesData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  const puzzleDrafts: MathCommunityPuzzleDraft[] = puzzleDraftsData.map(
    (item) => JSON.parse(JSON.stringify(item))
  );
  const puzzleSessionHistory: PopulatedPuzzleSession[] = puzzleData.map(
    (item) => JSON.parse(JSON.stringify(item))
  );

  const recentAiChats = [
    {
      title: "Limit hints for tricky epsilon-delta",
      lastTurn: "assistant",
      createdAt: "2h ago",
      turns: 8,
      latestMessage:
        "Try bounding |f(x)-L| by splitting the expression; isolate the square root term.",
    },
    {
      title: "Combinatorics: counting derangements",
      lastTurn: "user",
      createdAt: "1d ago",
      turns: 6,
      latestMessage: "So the recurrence is D(n) = (n-1)(D(n-1)+D(n-2)), right?",
    },
    {
      title: "Geometry: cyclic quadrilateral proof",
      lastTurn: "assistant",
      createdAt: "3d ago",
      turns: 10,
      latestMessage:
        "Use Ptolemy’s theorem on the diagonal you drew; it ties the side products together.",
    },
  ];

  const recentThreads = [
    {
      title: "Is there a slick proof for Vandermonde’s identity?",
      category: "Algebra",
      threadPrompt:
        "Looking for an intuitive argument that avoids heavy algebra.",
      replies: 12,
      createdAt: "2h ago",
    },
    {
      title: "Visual intuition for Green’s Theorem",
      category: "Calculus",
      threadPrompt:
        "How do you picture the curl vs divergence pieces in simple regions?",
      replies: 7,
      createdAt: "20h ago",
    },
    {
      title: "Favourite counterexamples in topology",
      category: "Topology",
      threadPrompt: "Share your go-to spaces that break common intuitions.",
      replies: 18,
      createdAt: "4d ago",
    },
  ];

  const recentCommunityPuzzles = [
    {
      title: "Prime Ladder",
      category: "Number Theory",
      difficulty: "Beginner",
      problemText:
        "Build a strictly increasing sequence of primes that sums to 100. What is the maximum possible length?",
      hint: "Start small, then adjust parity with your final prime choice.",
      solutionOutline:
        "Balance tiny primes early and pick a mid-size closing prime to hit 100.",
      ratings: { average: 4.6, count: 32 },
      attempts: { total: 240, correct: 112 },
      comments: 14,
      flags: 1,
    },
    {
      title: "Symmetry in Infinite Grids",
      category: "Geometry",
      difficulty: "Advanced",
      problemText:
        "Color an infinite grid so every 3x3 square has rotational symmetry. How many colors suffice?",
      hint: "Test two colors against the center; watch the corner conflicts.",
      solutionOutline:
        "Two colors fail under rotation; three resolve the constraint.",
      ratings: { average: 4.8, count: 21 },
      attempts: { total: 126, correct: 44 },
      comments: 9,
      flags: 0,
    },
    {
      title: "Generating Functions Warmup",
      category: "Algebra",
      difficulty: "Intermediate",
      problemText:
        "Find the closed form for the coefficient of x^n in (1 - 2x)^{-3}.",
      hint: "Use the negative binomial series and track the shift carefully.",
      solutionOutline:
        "Expand with binomial coefficients and simplify the factorial ratio.",
      ratings: { average: 4.5, count: 18 },
      attempts: { total: 188, correct: 101 },
      comments: 6,
      flags: 2,
    },
  ];

  const recentDrafts = [
    {
      title: "Convex Hull Warmup",
      category: "Geometry",
      difficulty: "Intermediate",
      problemText:
        "Given n points in the plane, how many vertices can the convex hull have in the worst case?",
      hint: "Think about points in strictly convex position.",
      solutionOutline:
        "All points can be extremal; hull uses n vertices when no point lies inside the convex hull of others.",
      answers: ["n"],
      updatedAt: "1h ago",
    },
    {
      title: "Rapid Recurrence",
      category: "Algebra",
      difficulty: "Advanced",
      problemText: "Solve a_{n+1} = 2a_n + 3 with a_0 = 1. Give closed form.",
      hint: "Unroll or use the particular + homogeneous approach.",
      solutionOutline:
        "a_n = 2^{n+1} - 3 after summing geometric contributions.",
      answers: ["2^{n+1}-3"],
      updatedAt: "6h ago",
    },
    {
      title: "Selective Coloring",
      category: "Combinatorics",
      difficulty: "Beginner",
      problemText:
        "How many ways to color 4 distinct boxes red or blue with exactly two red?",
      hint: "Choose the red boxes.",
      solutionOutline: "Pick any 2 of 4 boxes: C(4,2)=6 colorings.",
      answers: ["6"],
      updatedAt: "1d ago",
    },
  ];

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
      <div className="w-full max-w-[800px] bg-gray-50 rounded-md border border-gray-400 p-5 space-y-4">
        <div className="flex items-center gap-4">
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
          <div>
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-bold">{session.user.name}</h1>
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
        <div className="grid grid-cols-4 gap-4">
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">RECENT SESSIONS</h1>
          <Link href="/user/profile/session-history">
            <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
              <p className="text-lg font-medium">View All</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {puzzleSessionHistory.slice(0, 3).map((item) => {
            return <SessionCard puzzleSession={item} key={item._id} />;
          })}
        </div>
        <hr className="text-gray-400" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">YOUR RECENT AI CHATS</h1>
          <Link href="/user/community/ai-math-chat">
            <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
              <p className="text-lg font-medium">Go to AI Math Chat</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {aiChats.map((chat) => (
            <div
              key={chat._id}
              className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <FaMessage className="text-cyan-700" />
                <span className="text-gray-500">{timeAgo(chat.createdAt)}</span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {chat.chats.length > 0
                  ? chat.chats[chat.chats.length - 1].content
                  : "No messages yet."}
              </p>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <FaClock className="text-gray-500" />
                  {chat.chats.length / 2} exchange/s
                </span>
              </div>
            </div>
          ))}
        </div>
        <hr className="text-gray-400" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">YOUR RECENT THREADS</h1>
          <Link href="/user/profile/threads">
            <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
              <p className="text-lg font-medium">View all threads</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {recentThreads.map((thread, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span className="inline-flex items-center gap-2">
                  <FaComments className="text-cyan-700" />
                  {thread.title}
                </span>
                <span className="text-gray-500">{thread.createdAt}</span>
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
                  {thread.replies} replies
                </span>
              </div>
            </div>
          ))}
        </div>
        <hr className="text-gray-400" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">YOUR COMMUNITY PUZZLES</h1>
          <Link href="/user/profile/puzzles">
            <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
              <p className="text-lg font-medium">View all puzzles</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {recentCommunityPuzzles.map((puzzle, idx) => (
            <div
              key={idx}
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
                  {puzzle.ratings.average}★ / {puzzle.ratings.count}
                </span>
                <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  {puzzle.attempts.correct} correct of {puzzle.attempts.total}
                </span>
                <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  {puzzle.comments} comments
                </span>
                <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  {puzzle.flags} flags
                </span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Hint:</strong> {puzzle.hint}
                </p>
                <p>
                  <strong>Outline:</strong> {puzzle.solutionOutline}
                </p>
              </div>
            </div>
          ))}
        </div>
        <hr className="text-gray-400" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">YOUR PUZZLE DRAFTS</h1>
          <Link href="/user/profile/puzzles/drafts">
            <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
              <p className="text-lg font-medium">View all drafts</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {recentDrafts.map((draft, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white"
            >
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
                <p>
                  <strong>Hint:</strong> {draft.hint}
                </p>
                <p>
                  <strong>Outline:</strong> {draft.solutionOutline}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <FaClock className="text-gray-500" />
                  Updated {draft.updatedAt}
                </span>
                <span className="px-2 py-1 rounded-md bg-white ring-1 ring-gray-200 text-gray-700">
                  Draft fields shown
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
