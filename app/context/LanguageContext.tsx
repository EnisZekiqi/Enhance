"use client";
import { createContext, useState, ReactNode } from "react";

type UserContextType = {
  user: string;
  setUser: (user: string | ((prev: string) => string)) => void;
  clicked: string;
  setClicked: (clicked: string | ((prev: string) => string)) => void;
}; // <-- added missing brace/semicolon

export const LanguageContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>("english");
  const [clicked, setClicked] = useState<string>("");

  return (
    <LanguageContext.Provider value={{ user, setUser, clicked, setClicked }}>
      {children}
    </LanguageContext.Provider>
  );
};