import Link from "next/link";
import {
  FaArrowLeft,
  FaComments,
  FaMessage,
} from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { connectDB } from "@/db/db";
import threadModel from "@/db/schemas/thread-model";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { timeAgo } from "@/lib/utils";

const UserThreadsPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  await connectDB();
  const data = await threadModel
    .find({ startedBy: session.user.id })
    .sort({ createdAt: -1, _id: -1 });
  const threads = data.map((item) => JSON.parse(JSON.stringify(item)));
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[900px] bg-gray-50 rounded-md border border-gray-400 p-6 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/user/profile">
            <div className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <FaArrowLeft />
              Back to profile
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Your Threads</h1>
        </div>

        {threads.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-700">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
              <FaComments className="text-cyan-700" />
              You haven&apos;t started any threads
            </div>
            <p className="text-sm text-gray-600">
              Start a discussion to ask for hints, share progress, or invite feedback from the community.
            </p>
            <Link
              href="/user/community/discussions"
              className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-700"
            >
              Create a thread
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {threads.map((thread) => (
              <Link
                key={thread._id}
                href={`/user/community/discussions/thread/${thread._id}`}
              >
                <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <FaComments className="text-cyan-700" />
                      {thread.title}
                    </div>
                    <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 text-xs font-semibold">
                      {thread.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{thread.threadPrompt}</p>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <FaMessage className="text-gray-500" />
                      {thread.replies.length} replies
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FaClock className="text-gray-500" />
                      {timeAgo(thread.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserThreadsPage;
