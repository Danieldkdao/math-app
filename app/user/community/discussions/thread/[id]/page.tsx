import PostReply from "@/components/Dashboard/community/threads/post-reply";
import threadModel from "@/db/schemas/thread-model";
import type { Thread } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import mongoose from "mongoose";
import Link from "next/link";
import { FaComments, FaRegCommentDots, FaUser } from "react-icons/fa";
import { FaClock, FaArrowRightLong } from "react-icons/fa6";
import Image from 'next/image';

type ThreadPageProps = {
  params: Promise<{ id: string }>;
};

const ThreadPage = async ({ params }: ThreadPageProps) => {
  const { id } = await params;
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(id))
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl space-y-8 px-4 py-8">
          <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
                <FaComments />
                Thread
              </p>
              <h1 className="text-3xl font-bold text-gray-900">
                Thread with id: {id} was not found
              </h1>
              <p className="text-sm text-gray-500">
                The thread may have been deleted or it never existed in the
                first place.
              </p>
            </div>
          </header>
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">
                Want more threads?
              </p>
              <p className="text-sm text-gray-600">
                Browse the discussions hub for hints, writeups, and Q&A.
              </p>
            </div>
            <Link
              href="/user/community/discussions"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              Back to discussions
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    );
  const data = await threadModel.findById(id);
  if (!data) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl space-y-8 px-4 py-8">
          <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
                <FaComments />
                Thread
              </p>
              <h1 className="text-3xl font-bold text-gray-900">
                Thread with id: {id} was not found
              </h1>
              <p className="text-sm text-gray-500">
                The thread may have been deleted or it never existed in the
                first place.
              </p>
            </div>
          </header>
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">
                Want more threads?
              </p>
              <p className="text-sm text-gray-600">
                Browse the discussions hub for hints, writeups, and Q&A.
              </p>
            </div>
            <Link
              href="/user/community/discussions"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              Back to discussions
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const threadInformation: Thread = JSON.parse(JSON.stringify(data));
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
              <FaComments />
              Thread
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Community discussion
            </h1>
            <p className="text-sm text-gray-600">
              Thread ID:{" "}
              <span className="font-semibold text-gray-900">{id}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm text-gray-700">
            <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
              <FaClock className="text-cyan-600" />
              Active contributors
            </div>
            <p className="text-gray-600">
              Join in with hints, sketches, or questions.
            </p>
          </div>
        </header>
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Original post
            </p>
            <h2 className="text-xl font-semibold text-gray-900">
              {threadInformation.title}
            </h2>
            <p className="text-sm text-gray-700">
              {threadInformation.threadPrompt}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
              {threadInformation.category}
            </div>
          </div>
        </section>
        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FaRegCommentDots className="text-cyan-600" />
              Replies
            </div>
            <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
              {threadInformation.replies.length} responses
            </span>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {threadInformation.replies.length > 0 ? (
              threadInformation.replies.reverse().map((reply) => (
                <div
                  key={reply._id}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    {reply.author.image ? <Image src={reply.author.image} alt="Author profile image" width={40} height={40} className="rounded-full"/> : <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                      <FaUser />
                    </div>}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                        {reply.author.name}
                        <span className="text-gray-500">·</span>
                        <span className="text-xs font-normal text-gray-500">
                          {timeAgo(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 font-medium">
                No replies yet! Be the first to share your ideas and help out a
                fellow creator!
              </p>
            )}
          </div>
        </section>
        <section className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FaComments className="text-orange-600" />
            Add a reply
          </div>
          <PostReply threadId={threadInformation._id} />
        </section>
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">
              Want more threads?
            </p>
            <p className="text-sm text-gray-600">
              Browse the discussions hub for hints, writeups, and Q&A.
            </p>
          </div>
          <Link
            href="/user/community/discussions"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            Back to discussions
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
