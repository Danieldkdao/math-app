import {
  FaComments,
  FaFire,
  FaHashtag,
  FaPenFancy,
  FaSearch,
} from "react-icons/fa";
import {
  FaClockRotateLeft,
  FaRegCommentDots,
  FaCircleUser,
} from "react-icons/fa6";
import { formatTime, threadCategories, timeAgo } from "@/lib/utils";
import { connectDB } from "@/db/db";
import threadModel from "@/db/schemas/thread-model";
import CreateThread from "@/components/Dashboard/community/threads/create-thread";
import type { PopulatedThread } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import ThreadSearch from "@/components/Dashboard/community/threads/thread-search";
import ListThreads from "@/components/Dashboard/community/threads/list-threads";

const DiscussionsPage = async () => {
  await connectDB();
  const data = await threadModel
    .find()
    .populate("startedBy")
    .sort({ createdAt: -1, _id: -1 });
  const threads: PopulatedThread[] = data.map((item) =>
    JSON.parse(JSON.stringify(item))
  );

  const trendingThreads = threads
    .sort((a, b) => a.replies.length - b.replies.length)
    .slice(0, 3);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              <FaComments className="text-amber-600" />
              Community Discussions
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Swap strategies, hints, and insights
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Start a new thread or jump into ongoing conversations. Be generous
              with hints, clear with spoilers, and keep threads focused.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm text-gray-700">
            <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
              <FaClockRotateLeft className="text-cyan-600" />
              Join the conversation
            </div>
            <p className="text-gray-600">
              Collaborate, share ideas, and connect with peers in every thread.
            </p>
          </div>
        </header>
        <section className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <CreateThread />
            <ThreadSearch />
            <ListThreads threads={threads} />
          </div>
          {threads.length > 0 && (
            <aside className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  <FaFire />
                  Trending threads
                </div>
                <ul className="mt-3 text-sm text-gray-800 flex flex-col gap-3">
                  {trendingThreads.map((thread, index) => {
                    return (
                      <Link
                        key={index}
                        href={`/usercommunity/discussions/thread/${thread._id}`}
                      >
                        <li className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-amber-100">
                          {thread.title}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <FaRegCommentDots className="text-cyan-600" />
                  Starter prompts
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>- Ask for a hint on a step you already tried.</li>
                  <li>- Share a partial approach and invite critiques.</li>
                  <li>- Post a theory question tied to a community puzzle.</li>
                  <li>
                    - Share your latest ideas with the community for feedback.
                  </li>
                </ul>
              </div>
            </aside>
          )}
        </section>
      </div>
    </div>
  );
};

export default DiscussionsPage;
