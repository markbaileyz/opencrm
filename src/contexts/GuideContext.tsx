
import React, { createContext, useContext } from "react";
import { GuideContextType } from "../types/guide-context";
import { useGuideProvider } from "../hooks/useGuideProvider";

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const guideProviderValue = useGuideProvider();

  return (
    <GuideContext.Provider value={guideProviderValue}>
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (context === undefined) {
    throw new Error("useGuide must be used within a GuideProvider");
  }
  return context;
};
