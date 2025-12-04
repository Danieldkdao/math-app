"use client";

import { useAIChat } from "@/hooks/useAIChat";
import type { Chat, ChatSession } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FaClock, FaMessage } from "react-icons/fa6";

const ListRecentChats = ({ aiChats }: { aiChats: ChatSession[] }) => {
  const { setCurrentChatSessionId, setConversations } = useAIChat();
  const router = useRouter();

  const handleNavigateToChat = (chatId: string, conversations: Chat[]) => {
    setCurrentChatSessionId(chatId);
    setConversations(conversations);
    router.push(`/user/community/ai-math-chat`);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {aiChats.map((chat) => (
        <div
          key={chat._id}
          className="flex flex-col gap-3 border border-gray-400 rounded-md p-4 bg-white cursor-pointer"
          onClick={() => handleNavigateToChat(chat._id, chat.chats)}
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
              {chat.chats.length / 2} exchange(s)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListRecentChats;
