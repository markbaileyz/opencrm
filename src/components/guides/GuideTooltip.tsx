
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGuide } from "@/contexts/GuideContext";
import { cn } from "@/lib/utils";

type Position = {
  top: number;
  left: number;
  transform: string;
  position: "absolute" | "fixed";
};

const GuideTooltip: React.FC = () => {
  const { 
    currentGuide, 
    currentStepIndex,

    isGuideActive, 
    nextStep, 
    prevStep, 
    skipToStep, 
    stopGuide 
  } = useGuide();
  
  const [position, setPosition] = useState<Position>({
    top: 50,
    left: 50,
    transform: "translate(-50%, -50%)",
    position: "fixed",
  });

  const currentStep = currentGuide?.steps[currentStepIndex];

  useEffect(() => {
    if (!isGuideActive || !currentStep?.elementSelector) return;

    const targetElement = document.querySelector(currentStep.elementSelector);
    if (!targetElement) return;

    const updatePosition = () => {
      const rect = targetElement.getBoundingClientRect();
      const pos = currentStep.position || "bottom";
      
      let newPos: Position;
      
      switch (pos) {
        case "top":
          newPos = {
            top: rect.top - 10,
            left: rect.left + rect.width / 2,
            transform: "translate(-50%, -100%)",
            position: "fixed",
          };
          break;
        case "right":
          newPos = {
            top: rect.top + rect.height / 2,
            left: rect.right + 10,
            transform: "translate(0, -50%)",
            position: "fixed",
          };
          break;
        case "bottom":
          newPos = {
            top: rect.bottom + 10,
            left: rect.left + rect.width / 2,
            transform: "translate(-50%, 0)",
            position: "fixed",
          };
          break;
        case "left":
          newPos = {
            top: rect.top + rect.height / 2,
            left: rect.left - 10,
            transform: "translate(-100%, -50%)",
            position: "fixed",
          };
          break;
        default:
          newPos = {
            top: rect.bottom + 10,
            left: rect.left + rect.width / 2,
            transform: "translate(-50%, 0)",
            position: "fixed",
          };
      }
      
      setPosition(newPos);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Highlight target element
    targetElement.classList.add("guide-target-highlight");

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
      targetElement.classList.remove("guide-target-highlight");
    };
  }, [currentStep, isGuideActive]);

  if (!isGuideActive || !currentGuide || !currentStep) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 z-50"
        onClick={(e) => {
          // Only close if clicking directly on the overlay
          if (e.target === e.currentTarget) {
            stopGuide();
          }
        }}
      />
      
      {/* Tooltip */}
      <Card
        className="guide-tooltip z-50 shadow-lg w-80"
        style={{
          position: position.position,
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: position.transform,
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{currentStep.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={stopGuide} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="h-5">
              Step {currentStepIndex + 1} of {currentGuide.steps.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm">
          <p>{currentStep.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={nextStep}
          >
            {currentStepIndex === currentGuide.steps.length - 1 ? (
              "Finish"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default GuideTooltip;
