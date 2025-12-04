"use client";

import { useState } from "react";
import {
  FaClock,
  FaCommentDots,
  FaPaperPlane,
  FaPlus,
  FaRobot,
  FaUser,
} from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { chatWithMathAIAction } from "@/lib/actions";
import MarkdownRenderer from "@/components/General/markdown-renderer";
import { NoIdChat } from "@/lib/types";
import { redirect } from "next/navigation";
import { FaHistory } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import { KeyboardEvent } from "react";
import { useAIChat } from "@/hooks/useAIChat";
import { authClient } from "@/lib/auth/auth-client";
import Image from "next/image";

const suggestedPrompts = [
  "Generate a gentle hint for a geometry proof without revealing the angle chase.",
  "Summarize the key idea behind the latest Deep Dive puzzle.",
  "Draft a rubric to grade a community puzzle solution quickly.",
  "List misconceptions solvers often have with generating functions.",
];

const Chatbox = () => {
  const {
    conversations,
    setConversations,
    currentChatSessionId,
    setCurrentChatSessionId,
  } = useAIChat();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"assistant" | "tutor">(
    "assistant"
  );
  const { setIsModalOpen } = useModal();
  const {data: session} = authClient.useSession();

  if (session == null) {
    redirect("/");
    toast.error("You must be signed in to chat with AI.");
    return;
  }

  const sendChat = async () => {
    if (!prompt.trim().length)
      return toast.error("Please enter a valid prompt.");
    const newConversation: NoIdChat = { role: "user", content: prompt };
    setConversations((prev) => [...prev, newConversation]);
    setPrompt("");
    setLoading(true);
    try {
      const response = await chatWithMathAIAction(
        prompt,
        selectedRole,
        conversations,
        currentChatSessionId
      );
      if (!response) {
        toast.error("Please sign in to use the AI chat.");
        return redirect("/");
      }
      if (response.chatSessionId)
        setCurrentChatSessionId(response.chatSessionId);
      const chatbotResponse: NoIdChat = {
        role: "assistant",
        content: response.content,
      };
      setConversations((prev) => [...prev, chatbotResponse]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate response.");
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    if (conversations.length === 0) return;
    if (!confirm("Are you sure you want to start a new chat?")) return;
    setConversations([]);
    setLoading(false);
    setCurrentChatSessionId(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!prompt.trim()) return;
    if (e.key === "Enter" && !e.shiftKey) {
      sendChat();
    }
  };

  return (
    <div className="w-full space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
            <FaRobot className="text-cyan-600" />
            AI Math Chat
          </p>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Get puzzle-aware hints and coaching
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Ask for structured hints, solution outlines, or concept
              refreshers. Keep spoilers hidden in your requests if you prefer to
              discover the key move yourself.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-700 cursor-pointer"
            >
              <FaHistory />
              View previous conversations
            </button>
            <button
              onClick={startNewChat}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-700 cursor-pointer"
            >
              <FaPlus />
              Start new chat
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm text-gray-700 space-y-1">
          <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
            <FaClock className="text-cyan-600" />
            Your conversations are always saved
          </div>
          <p className="text-gray-600">
            Pick up right where you left off - every session stays tied to your
            account.
          </p>
        </div>
      </header>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FaCommentDots className="text-cyan-600" />
            Conversation
          </div>
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(e.target.value as "assistant" | "tutor")
            }
            className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200"
          >
            <option value="assistant">Assistant</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 max-h-[420px] overflow-y-auto">
          {conversations.length === 0 ? (
            <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-500">
              Ask anything
            </h1>
          ) : (
            conversations.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end text-right"
                    : "justify-start text-left"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-white shadow-sm">
                    <FaRobot />
                  </div>
                )}
                {message.role === "user" ? (
                  <div className="max-w-full sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm bg-white text-gray-900 shadow ring-1 ring-gray-200">
                    {message.content}
                  </div>
                ) : (
                  <div className="max-w-full sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm bg-cyan-600 text-white shadow">
                    <MarkdownRenderer text={message.content} />
                  </div>
                )}
                {message.role === "user" ? session.user.image ? (
                  <div className="flex-shrink-0">
                    <Image src={session.user.image} alt="User profile image" width={35} height={35} className="rounded-full"/>
                  </div>
                  
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm">
                    <FaUser />
                  </div>
                ) : <></>}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3 justify-start text-left">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-white shadow-sm">
                <FaRobot />
              </div>
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500"></span>
                <span
                  className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"
                  style={{ animationDelay: "0.15s" }}
                ></span>
                <span
                  className="h-2 w-2 animate-pulse rounded-full bg-cyan-300"
                  style={{ animationDelay: "0.3s" }}
                ></span>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 flex items-center">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                placeholder="Ask for a hint, outline, or quick concept refresher..."
                className="w-full resize-none max-h-52 field-sizing-content outline-none"
              />
              <button
                onClick={sendChat}
                disabled={loading}
                className={`flex items-center justify-center gap-2 rounded-full bg-cyan-600 p-2 text-sm font-semibold text-white shadow hover:bg-cyan-700 self-end ${
                  loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <span
                onClick={() => setPrompt(prompt)}
                key={prompt}
                className="rounded-full cursor-pointer border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm"
              >
                {prompt}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
