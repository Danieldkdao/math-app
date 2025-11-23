import { connectDB } from "@/db/db";
import threadModel from "@/db/schemas/thread-model";
import type { Thread } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { FaComments, FaLightbulb, FaRobot } from "react-icons/fa";
import { FaArrowRightLong, FaFireFlameCurved } from "react-icons/fa6";

const cards = [
  {
    title: "Daily Challenge",
    description: "A fresh community puzzle every day to keep your mind sharp.",
    badge: "New",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Rising Creators",
    description: "Top puzzle authors this week based on solves and votes.",
    badge: "Trending",
    color: "from-orange-400 to-rose-500",
  },
  {
    title: "Deep Dives",
    description: "Long-form walkthroughs and strategies from the community.",
    badge: "Editor's pick",
    color: "from-purple-500 to-indigo-600",
  },
];

const threadsPreview = [
  {
    title: "Geometric proof for the tiling parity puzzle",
    status: "Active",
    meta: "42 replies · 12m ago",
  },
  {
    title: "Sharing hints for the latest daily challenge",
    status: "Active",
    meta: "57 replies · 1h ago",
  },
];

const CommunityPage = async () => {
  await connectDB();
  const threadData = await threadModel.find().sort({ createdAt: -1, _id: -1 }).limit(3);
  const latestThreads: Thread[] = threadData.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            <FaFireFlameCurved />
            Community Hub
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Build, discuss, and solve together
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Preview what the community is building, chatting about, and
                exploring with the AI coach. Jump into the dedicated pages for
                the full experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/user/community/puzzles"
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-700 transition"
              >
                Browse puzzles
                <FaArrowRightLong />
              </Link>
              <Link
                href="/user/community/puzzles/create"
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Create a puzzle
              </Link>
              <Link
                href="/user/community/discussions"
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Discussions
              </Link>
              <Link
                href="/user/community/ai-math-chat"
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                AI chat
              </Link>
            </div>
          </div>
        </header>
        <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">
                  Community Puzzles
                </p>
                <h2 className="text-xl font-semibold text-gray-900">
                  Curated feeds for builders and solvers
                </h2>
              </div>
              <Link
                href="/user/community/puzzles"
                className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${card.color}`}
                  />
                  <div className="space-y-3 p-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100">
                      {card.badge}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                    <Link
                      href="/user/community/puzzles"
                      className="flex items-center gap-2 text-sm font-semibold text-cyan-700"
                    >
                      Explore feed
                      <FaArrowRightLong />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-dashed border-cyan-200 bg-cyan-50/50 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-cyan-900">
                  Feature your puzzle
                </h4>
                <p className="text-sm text-cyan-800">
                  Submit to the spotlight queue and collect feedback from top
                  solvers.
                </p>
              </div>
              <Link
                href="/user/community/puzzles/create"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm ring-1 ring-cyan-100 hover:bg-cyan-100 transition"
              >
                Start creating
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                <FaComments />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-700">
                  Discussions
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  Community threads preview
                </h2>
              </div>
            </div>
            <div className="grid gap-3">
              {latestThreads.map((thread) => (
                <Link
                  key={thread._id}
                  href={`/user/community/discussions/thread/${thread._id}`}
                >
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">
                        {thread.title}
                      </p>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{`${
                      thread.replies.length
                    } replies · ${
                      thread.replies.length > 0
                        ? timeAgo(
                            thread.replies[thread.replies.length - 1].createdAt
                          )
                        : "None"
                    }`}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/user/community/discussions"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
            >
              Go to discussions
            </Link>
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
                  AI Chatbot
                </p>
                <h2 className="text-xl font-semibold text-gray-900">
                  Ask for hints, ideas, or solutions
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <FaRobot />
                Preview
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-700">
                "Need a nudge? Ask the AI coach for a tailored hint while
                keeping the solution spoiler-free."
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-emerald-200 bg-white p-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <FaRobot />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    Chatbot
                    <span className="h-1 w-1 rounded-full bg-emerald-300" />
                    Typing...
                  </div>
                  <div className="mt-2 h-12 rounded-lg bg-emerald-50/70 p-3 text-sm text-emerald-900">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                        style={{ animationDelay: "0.15s" }}
                      ></span>
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-emerald-300"
                        style={{ animationDelay: "0.3s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/user/community/ai-math-chat"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
            >
              Open AI math chat
            </Link>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700">
                <FaLightbulb />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">
                  Creator Corner
                </p>
                <h2 className="text-lg font-semibold text-gray-900">
                  Prep your next puzzle
                </h2>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              Quick guides and formatting tips to make your puzzle stand out in
              the community feeds.
            </div>
            <Link
              href="/user/community/puzzles/create"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-cyan-700 transition"
            >
              Start a new puzzle
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
