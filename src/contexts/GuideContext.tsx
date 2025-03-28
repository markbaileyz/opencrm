
import React, { createContext, useContext, useState } from "react";

interface GuideStep {
  id: string;
  title: string;
  content: string;
  elementSelector?: string;
  position?: "top" | "right" | "bottom" | "left";
}

interface Guide {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: GuideStep[];
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
  addGuide: (guide: Omit<Guide, "id">) => string;
  updateGuide: (guide: Guide) => void;
  deleteGuide: (guideId: string) => void;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guides, setGuides] = useState<Guide[]>([]);
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

  // Add functions needed by GuideBuilder and GuideManagement
  const addGuide = (guide: Omit<Guide, "id">) => {
    const newGuide: Guide = {
      ...guide,
      id: crypto.randomUUID(),
    };
    setGuides(prev => [...prev, newGuide]);
    return newGuide.id;
  };

  const updateGuide = (updatedGuide: Guide) => {
    setGuides(prev => 
      prev.map(guide => 
        guide.id === updatedGuide.id ? updatedGuide : guide
      )
    );
    
    // If the current guide is being updated, update it as well
    if (currentGuide && currentGuide.id === updatedGuide.id) {
      setCurrentGuide(updatedGuide);
    }
  };

  const deleteGuide = (guideId: string) => {
    setGuides(prev => prev.filter(guide => guide.id !== guideId));
    
    // If the current guide is being deleted, stop the guide
    if (currentGuide && currentGuide.id === guideId) {
      stopGuide();
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
        addGuide,
        updateGuide,
        deleteGuide
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
