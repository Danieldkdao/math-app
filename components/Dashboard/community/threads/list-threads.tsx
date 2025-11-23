"use client";

import type { PopulatedThread } from "@/lib/types";
import { formatTime, timeAgo } from "@/lib/utils";
import Link from "next/link";
import {
  FaCircleUser,
  FaComments,
  FaHashtag,
  FaRegCommentDots,
} from "react-icons/fa6";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useThreads } from "@/hooks/useThreads";

const ListThreads = ({ threads }: { threads: PopulatedThread[] }) => {
  const [filteredThreads, setFilteredThreads] = useState([...threads]);
  const { searchQuery, categoryFilters } = useThreads();

  useEffect(() => {
    let tempFilteredThreads = [...threads];
    if (searchQuery.trim()) {
      tempFilteredThreads = tempFilteredThreads.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.startedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categoryFilters.length > 0) {
      tempFilteredThreads = tempFilteredThreads.filter((item) =>
        categoryFilters.includes(item.category)
      );
    }
    setFilteredThreads(tempFilteredThreads);
  }, [searchQuery, categoryFilters, threads]);

  return (
    <div className="grid gap-3">
      {threads.length > 0 ? (
        filteredThreads.map((thread) => (
          <Link
            key={thread._id}
            href={`/user/community/discussions/thread/${thread._id}`}
          >
            <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                    <FaHashtag className="text-cyan-600" />
                    {thread.category}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {thread.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatTime(thread.createdAt).date} at{" "}
                    {formatTime(thread.createdAt).time}
                  </p>
                  <div className="flex items-center gap-2">
                    {thread.startedBy.image ? (
                      <Image
                        src={thread.startedBy.image}
                        alt="User profile image"
                        width={25}
                        height={25}
                        className="rounded-full"
                      />
                    ) : (
                      <FaCircleUser size={25} />
                    )}
                    <h3 className="text-sm font-medium text-gray-500">
                      {thread.startedBy.name}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    <FaRegCommentDots />
                    {thread.replies.length} replies
                  </span>
                  <span className="text-xs text-gray-500">
                    {thread.replies[thread.replies.length - 1] &&
                      `Last active ${timeAgo(
                        thread.replies[thread.replies.length - 1].createdAt
                      )}`}
                  </span>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                Continue thread
                <FaComments />
              </div>
            </article>
          </Link>
        ))
      ) : (
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-500 to-fuchsia-600">
            No threads created yet!
          </h1>
          <p className="text-gray-600">
            Be the first to create meaningful and interesting discussions with
            the math community!
          </p>
        </div>
      )}
    </div>
  );
};

export default ListThreads;
