
import React, { createContext, useContext, useState } from "react";

interface Guide {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: {
    id: string;
    title: string;
    content: string;
    elementSelector?: string;
    position?: "top" | "right" | "bottom" | "left";
  }[];
}

interface GuideContextType {
  guides: Guide[];
  currentGuide: Guide | null;
  currentStepIndex: number;
  isGuideActive: boolean;
  startGuide: (guideId: string) => void;
  stopGuide: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipToStep: (index: number) => void;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guides] = useState<Guide[]>([]);
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startGuide = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      setCurrentGuide(guide);
      setCurrentStepIndex(0);
    }
  };

  const stopGuide = () => {
    setCurrentGuide(null);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (!currentGuide) return;
    
    if (currentStepIndex < currentGuide.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      stopGuide();
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const skipToStep = (index: number) => {
    if (currentGuide && index >= 0 && index < currentGuide.steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return (
    <GuideContext.Provider
      value={{
        guides,
        currentGuide,
        currentStepIndex,
        isGuideActive: !!currentGuide,
        startGuide,
        stopGuide,
        nextStep,
        prevStep,
        skipToStep,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};

export const useGuide = (): GuideContextType => {
  const context = useContext(GuideContext);
  if (context === undefined) {
    throw new Error("useGuide must be used within a GuideProvider");
  }
  return context;
};
