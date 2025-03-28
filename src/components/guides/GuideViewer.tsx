
import React, { useEffect, useRef } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const GuideViewer: React.FC = () => {
  const {
    currentGuide,
    currentStepIndex,
    isGuideActive,
    nextStep,
    prevStep,
    stopGuide,
    skipToStep
  } = useGuide();

  const tooltipRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGuideActive || !currentGuide) return;

    const currentStep = currentGuide.steps[currentStepIndex];
    if (!currentStep.elementSelector) return;

    const targetElement = document.querySelector(currentStep.elementSelector);
    if (!targetElement || !tooltipRef.current || !highlightRef.current) return;

    // Position the tooltip near the target element
    const targetRect = targetElement.getBoundingClientRect();
    const position = currentStep.position || "bottom";
    
    // Position the highlight overlay on the target element
    highlightRef.current.style.top = `${targetRect.top}px`;
    highlightRef.current.style.left = `${targetRect.left}px`;
    highlightRef.current.style.width = `${targetRect.width}px`;
    highlightRef.current.style.height = `${targetRect.height}px`;
    highlightRef.current.style.display = "block";

    // Position the tooltip based on the specified position
    switch(position) {
      case "top":
        tooltipRef.current.style.top = `${targetRect.top - tooltipRef.current.offsetHeight - 10}px`;
        tooltipRef.current.style.left = `${targetRect.left + (targetRect.width / 2) - (tooltipRef.current.offsetWidth / 2)}px`;
        break;
      case "right":
        tooltipRef.current.style.top = `${targetRect.top + (targetRect.height / 2) - (tooltipRef.current.offsetHeight / 2)}px`;
        tooltipRef.current.style.left = `${targetRect.right + 10}px`;
        break;
      case "bottom":
        tooltipRef.current.style.top = `${targetRect.bottom + 10}px`;
        tooltipRef.current.style.left = `${targetRect.left + (targetRect.width / 2) - (tooltipRef.current.offsetWidth / 2)}px`;
        break;
      case "left":
        tooltipRef.current.style.top = `${targetRect.top + (targetRect.height / 2) - (tooltipRef.current.offsetHeight / 2)}px`;
        tooltipRef.current.style.left = `${targetRect.left - tooltipRef.current.offsetWidth - 10}px`;
        break;
    }

    // Add scroll into view if needed
    const viewportHeight = window.innerHeight;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    if (tooltipRect.bottom > viewportHeight) {
      tooltipRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

  }, [currentGuide, currentStepIndex, isGuideActive]);

  if (!isGuideActive || !currentGuide) return null;

  const currentStep = currentGuide.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === currentGuide.steps.length - 1;
  const progress = ((currentStepIndex + 1) / currentGuide.steps.length) * 100;

  return (
    <>
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 w-96 max-w-[90vw] bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg border border-border animate-fade-up"
        style={{ 
          transform: "translateZ(0)",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{currentStep.title}</h3>
          <Button variant="ghost" size="icon" onClick={stopGuide} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4 prose prose-sm dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: currentStep.content }} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {currentGuide.steps.length}
            </span>
            <div className="relative h-1.5 w-24 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <Button variant="default" size="sm" onClick={nextStep}>
              {isLastStep ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Finish
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Element highlight */}
      <div
        ref={highlightRef}
        className="fixed z-40 pointer-events-none border-2 border-primary rounded animate-pulse"
        style={{ display: "none" }}
      />

      {/* Step indicators */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-background rounded-full shadow-lg border border-border p-2 flex items-center gap-1">
        {currentGuide.steps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === currentStepIndex 
                ? "bg-primary" 
                : "bg-muted hover:bg-primary/50"
            )}
            onClick={() => skipToStep(index)}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default GuideViewer;
