"use server";

import mathPuzzleModel from "@/db/schemas/math-puzzle-model";
import {
  ChatSession,
  MathPuzzleCategory,
  MathPuzzleDifficultyLevel,
  PuzzleSessionServer,
  type MathCommunityPuzzleDraft,
  type Thread,
  type ThreadCategories,
  type ThreadReply,
} from "./types";
import { connectDB } from "@/db/db";
import { mathPuzzleCategories, mathPuzzleDifficultyLevels } from "./utils";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";
import OpenAI from "openai";
import { NoIdChat } from "@/lib/types";
import { headers } from "next/headers";
import { auth } from "./auth/auth";
import chatSessionModel from "@/db/schemas/chat-session-model";
import mongoose from "mongoose";
import threadModel from "@/db/schemas/thread-model";
import puzzleDraftModel from "@/db/schemas/puzzle-draft-model";
import communityPuzzleModel from "@/db/schemas/community-puzzle-model";

export const fetchPuzzlesAction = async (
  selectedCategories: MathPuzzleCategory[],
  selectedDifficultyLevels: MathPuzzleDifficultyLevel[],
  numberOfPuzzles: number
) => {
  await connectDB();
  const data = await mathPuzzleModel.aggregate([
    {
      $match: {
        category: {
          $in:
            selectedCategories.length === 0
              ? mathPuzzleCategories
              : selectedCategories,
        },
        difficulty: {
          $in:
            selectedDifficultyLevels.length === 0
              ? mathPuzzleDifficultyLevels
              : selectedDifficultyLevels,
        },
      },
    },
    {
      $sample: {
        size: numberOfPuzzles,
      },
    },
  ]);
  const puzzles = data.map((item) => JSON.parse(JSON.stringify(item)));
  return puzzles;
};

export const savePuzzleSessionAction = async (
  session: Omit<PuzzleSessionServer, "createdAt" | "_id">
) => {
  try {
    const newSession = await puzzleSessionModel.create(session);
    if (!newSession) throw new Error("No session found.");
    const parsedSession: PuzzleSessionServer = JSON.parse(
      JSON.stringify(newSession)
    );
    return {
      success: true,
      message: "Session saved successfully!",
      session: parsedSession,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to save session." };
  }
};

export const chatWithMathAIAction = async (
  prompt: string,
  chatMode: "tutor" | "assistant",
  prevMessages: NoIdChat[],
  currentChatSessionId: string | null
) => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  const openai = new OpenAI({
    apiKey: process.env.OPEN_ROUTER_API!,
    baseURL: "https://openrouter.ai/api/v1",
  });
  const systemRole =
    chatMode === "assistant"
      ? "You are a helpful AI math assistant that answers any math related question to the best of your abilities. If the question is not math-related, politely reject and say that you cannot answer non-math-related questions. If any latex is used, make sure that it is wrapped in dollar signs and all latex functions must start with a //."
      : "You are a helpful AI math tutor that guides users to the answer by asking guiding question. Never give the user the solution directly or do the math problem for the user. If the question is not math-related, politely reject and say that you cannot answer non-math-related questions. If any latex is used, make sure that it is wrapped in dollar signs and all latex functions must start with a //.";
  try {
    const completion = await openai.chat.completions.create({
      model: "x-ai/grok-4.1-fast:free",
      messages: [
        { role: "system", content: systemRole },
        ...prevMessages,
        { role: "user", content: prompt },
      ],
    });
    const content =
      completion.choices[0].message.content ??
      "Failed to generate response. Please try again another time.";
    if (!currentChatSessionId) {
      const newChatSession: Omit<ChatSession, "createdAt" | "_id" | "chats"> & {
        chats: NoIdChat[];
      } = {
        user: session.user.id,
        chats: [
          { role: "user", content: prompt },
          { role: "assistant", content },
        ],
      };
      const chatSessionId = await chatSessionModel.create(newChatSession);
      return { chatSessionId: chatSessionId._id.toString(), content };
    } else {
      const chatsToPush: NoIdChat[] = [
        { role: "user", content: prompt },
        { role: "assistant", content },
      ];
      await chatSessionModel.findByIdAndUpdate(currentChatSessionId, {
        $push: { chats: { $each: chatsToPush } },
      });
      return { content };
    }
  } catch (error) {
    console.error(error);
    return {
      content: "Failed to generate response. Please try again another time.",
    };
  }
};

export const deleteChatSessionAction = async (sessionId: string) => {
  try {
    await chatSessionModel.findByIdAndDelete(sessionId);
    return { success: true, message: "Chat session deleted successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete chat session." };
  }
};

export const createThreadAction = async (
  title: string,
  prompt: string,
  category: ThreadCategories
) => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session)
    return {
      success: false,
      message: "You must be logged in to create a thread.",
    };
  const newThread: Omit<Thread, "_id" | "createdAt"> = {
    title,
    threadPrompt: prompt,
    startedBy: new mongoose.Types.ObjectId(session.user.id),
    category,
    replies: [],
  };
  try {
    await threadModel.create(newThread);
    return { success: true, message: "New thread created successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create new thread." };
  }
};

export const postThreadReplyAction = async (
  threadId: string,
  content: string
) => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session)
    return {
      success: false,
      message: "You must be signed in to engage in discussions.",
    };
  const newReply: Omit<ThreadReply, "_id" | "createdAt"> = {
    author: {
      name: session.user.name,
      image: session.user.image,
      id: session.user.id,
    },
    content,
  };
  try {
    await threadModel.findByIdAndUpdate(threadId, {
      $push: { replies: newReply },
    });
    return { success: true, message: "Reply posted successfully!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to post reply. Please try again later.",
    };
  }
};

export const createSavePuzzleDraftAction = async (
  puzzleDraft: Omit<MathCommunityPuzzleDraft, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    await puzzleDraftModel.create(puzzleDraft);
    return { success: true, message: "Puzzle draft saved successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to save puzzle draft." };
  }
};

export const publishCommunityMathPuzzleAction = async (
  puzzleDraft: Omit<MathCommunityPuzzleDraft, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    await communityPuzzleModel.create(puzzleDraft);
    return { success: true, message: "Puzzle published successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to publish puzzle." };
  }
};
