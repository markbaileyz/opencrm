
import React from "react";
import { GuideProvider } from "@/contexts/GuideContext";
import GuideButton from "./GuideButton";
import GuideTooltip from "./GuideTooltip";

const InteractiveGuides: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GuideProvider>
      {children}
      <GuideButton />
      <GuideTooltip />
      <style dangerouslySetInnerHTML={{
        __html: `
          .guide-target-highlight {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
            z-index: 60;
            position: relative;
          }
        `
      }} />
    </GuideProvider>
  );
};

export default InteractiveGuides;
