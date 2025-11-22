"use client";

import { ChatSession } from "@/lib/types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaCommentDots,
  FaTrash
} from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import { useAIChat } from "@/hooks/useAIChat";
import { Chat } from "@/lib/types";
import { useState } from "react";
import { deleteChatSessionAction } from '@/lib/actions';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const timeAgo = (input: string | Date | number) => {
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return "Invalid Date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
};

const PreviousConversationClient = ({
  previousConversations,
}: {
  previousConversations: ChatSession[];
}) => {
  const numberPerPage = 5;
  const { setIsModalOpen } = useModal();
  const router = useRouter();
  const { setConversations, setCurrentChatSessionId } = useAIChat();
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = Math.ceil(previousConversations.length / numberPerPage);

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(numberOfPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const paginationArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleSelectChatSession = (
    conversations: Chat[],
    newSessionId: string
  ) => {
    setConversations(conversations);
    setCurrentChatSessionId(newSessionId);
    setIsModalOpen(false);
  };

  const handlePagination = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) return;
    setCurrentPage(pageNumber);
  };

  const handleChatSessionDeletion = async (chatSessionId: string) => {
    const response = await deleteChatSessionAction(chatSessionId);
    if(response.success) {
      toast.success(response.message);
      router.refresh();
    } else toast.error(response.message);
  }

  return (
    <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100">
      <div className="flex items-start justify-between border-b border-gray-100 p-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
            <FaHistory className="text-cyan-600" />
            Session history
          </div>
          <div className="flex items-center gap-2">
            <FaCommentDots className="text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">
              Previous conversations
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            Browse your saved sessions, resume threads, or skim highlights. Double click on a session to delete it.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-100 cursor-pointer"
        >
          Close
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-3">
        {previousConversations.length > 0 ? (
          previousConversations
            .slice(
              (currentPage - 1) * numberPerPage,
              currentPage * numberPerPage
            )
            .map((conversation) => (
              <div
                key={conversation._id}
                className="rounded-2xl relative border border-gray-100 bg-gradient-to-br from-white via-cyan-50/40 to-emerald-50/40 p-4 shadow-sm hover:-translate-y-[1px] hover:shadow transition cursor-pointer group"
                onClick={() =>
                  handleSelectChatSession(conversation.chats, conversation._id)
                }
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-emerald-700">
                    {`${conversation.chats.length / 2} EXCHANGES`}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <FaClock className="text-cyan-600" />
                    {timeAgo(conversation.createdAt)}
                  </div>
                </div>
                <button onClick={async (e) => {
                  e.stopPropagation();
                  await handleChatSessionDeletion(conversation._id);
                  }} className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition cursor-pointer bg-gray-100 rounded-md p-2 right-2 top-2 bottom-2 hover:bg-gray-200">
                  <FaTrash color="red"/>
                </button>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-600 font-bold">
            No conversations found
          </p>
        )}
      </div>
      {numberOfPages > 1 &&<div className="w-full py-2 flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage - 1 < 1}
            className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm  ${
              currentPage - 1 < 1
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:bg-gray-50"
            }`}
          >
            <FaArrowLeft />
            Previous
          </button>
          <div className="flex items-center gap-1">
            {paginationArray.map((page) => (
              <button
                key={page}
                className={`h-9 w-9 rounded-full text-xs font-semibold transition cursor-pointer ${
                  page === currentPage
                    ? "bg-cyan-600 text-white shadow"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handlePagination(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage + 1 > numberOfPages}
            className={`inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm  ${
              currentPage + 1 > numberOfPages
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:bg-gray-50"
            }`}
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>}
    </div>
  );
};

export default PreviousConversationClient;
