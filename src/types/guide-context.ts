
export type GuideStep = {
  id: string;
  title: string;
  content: string;
  elementSelector?: string;
  position?: "top" | "right" | "bottom" | "left";
};

export type Guide = {
  id: string;
  name: string;
  description: string;
  steps: GuideStep[];
  category: string;
};

export interface GuideContextType {
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
