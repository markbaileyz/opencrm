
import { useState, useEffect } from "react";
import { Guide } from "../types/guide-context";
import { sampleGuides } from "../data/sample-guides";

export const useGuideProvider = () => {
  const [guides, setGuides] = useState<Guide[]>(sampleGuides);
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isGuideActive, setIsGuideActive] = useState(false);

  const startGuide = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      setCurrentGuide(guide);
      setCurrentStepIndex(0);
      setIsGuideActive(true);
    }
  };

  const stopGuide = () => {
    setCurrentGuide(null);
    setCurrentStepIndex(0);
    setIsGuideActive(false);
  };

  const nextStep = () => {
    if (currentGuide && currentStepIndex < currentGuide.steps.length - 1) {
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

  // Load guides from API or localStorage in a real implementation
  useEffect(() => {
    // In a real app, we'd fetch guides from an API
    // For now, we're using the sampleGuides defined above
  }, []);

  return {
    guides,
    currentGuide,
    currentStepIndex,
    isGuideActive,
    startGuide,
    stopGuide,
    nextStep,
    prevStep,
    skipToStep,
  };
};
