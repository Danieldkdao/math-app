"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, type ReactNode } from "react";

type AppContextType = {
  redirectIfSignedIn: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const redirectIfSignedIn = () => {
    authClient.getSession().then((session) => {
      if (session.data && session.data !== null) {
        router.push("/");
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        redirectIfSignedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error(
      "App context must be used inside the app context provider."
    );
  return context;
};
