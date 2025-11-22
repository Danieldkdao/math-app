"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { NoIdChat } from "@/lib/types";

type AIChatContextType = {
  currentChatSessionId: string | null;
  setCurrentChatSessionId: Dispatch<SetStateAction<string | null>>;
  conversations: NoIdChat[];
  setConversations: Dispatch<SetStateAction<NoIdChat[]>>;
};

const AIChatContext = createContext<AIChatContextType | null>(null);

export const AIChatContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentChatSessionId, setCurrentChatSessionId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<NoIdChat[]>([]);

  const value = {
    currentChatSessionId,
    setCurrentChatSessionId,
    conversations,
    setConversations,
  }

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  )
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if(!context) throw new Error("AI chat context must be used inside the AI chat context provider.");
  return context;
}
