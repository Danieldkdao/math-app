"use client";

import type { ThreadCategories } from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type ThreadContextType = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  categoryFilters: ThreadCategories[];
  setCategoryFilters: Dispatch<SetStateAction<ThreadCategories[]>>;
};

const ThreadContext = createContext<ThreadContextType | null>(null);

export const ThreadContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState<ThreadCategories[]>(
    []
  );

  const values: ThreadContextType = {
    searchQuery,
    setSearchQuery,
    categoryFilters,
    setCategoryFilters,
  };

  return (
    <ThreadContext.Provider value={values}>{children}</ThreadContext.Provider>
  );
};

export const useThreads = () => {
  const context = useContext(ThreadContext);
  if(!context) throw new Error("Thread context must be used inside the thread context provider.");
  return context;
}
