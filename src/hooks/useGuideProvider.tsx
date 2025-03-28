
import { useState, useEffect } from "react";
import { Guide } from "../types/guide-context";
import { sampleGuides } from "../data/sample-guides";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

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

  // New functions for guide management
  const addGuide = (guide: Omit<Guide, "id">) => {
    const newGuide: Guide = {
      ...guide,
      id: uuidv4(),
    };
    setGuides(prev => [...prev, newGuide]);
    toast.success("Guide created successfully");
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
    
    toast.success("Guide updated successfully");
  };

  const deleteGuide = (guideId: string) => {
    setGuides(prev => prev.filter(guide => guide.id !== guideId));
    
    // If the current guide is being deleted, stop the guide
    if (currentGuide && currentGuide.id === guideId) {
      stopGuide();
    }
    
    toast.success("Guide deleted successfully");
  };

  // Load guides from localStorage on initial load
  useEffect(() => {
    const savedGuides = localStorage.getItem("guides");
    if (savedGuides) {
      try {
        setGuides(JSON.parse(savedGuides));
      } catch (error) {
        console.error("Failed to parse saved guides:", error);
      }
    }
  }, []);

  // Save guides to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("guides", JSON.stringify(guides));
  }, [guides]);

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
    addGuide,
    updateGuide,
    deleteGuide
  };
};
