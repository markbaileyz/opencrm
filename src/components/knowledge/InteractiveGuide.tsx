
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, CheckCircle, HelpCircle, Play, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface GuideStep {
  title: string;
  content: React.ReactNode;
  image?: string;
  actionLabel?: string;
}

export interface InteractiveGuideProps {
  title: string;
  description: string;
  steps: GuideStep[];
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  onComplete?: () => void;
}

const InteractiveGuide: React.FC<InteractiveGuideProps> = ({
  title,
  description,
  steps,
  category,
  difficulty,
  estimatedTime,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={`font-medium ${getDifficultyColor()}`}>
            {difficulty}
          </Badge>
          <Badge variant="outline" className="bg-muted/50">
            <BookOpen className="h-3 w-3 mr-1" />
            {estimatedTime}
          </Badge>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <Badge variant="secondary" className="mr-2">
            {category}
          </Badge>
          {!completed ? (
            <div className="flex items-center mt-3 gap-2">
              <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {currentStep + 1}/{steps.length}
              </span>
            </div>
          ) : (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mt-3">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!completed ? (
          <div>
            <h3 className="font-medium text-lg mb-2">{steps[currentStep].title}</h3>
            <div className="prose dark:prose-invert max-w-none">
              {steps[currentStep].content}
            </div>
            {steps[currentStep].image && (
              <div className="mt-4 rounded-md overflow-hidden border">
                <img 
                  src={steps[currentStep].image} 
                  alt={steps[currentStep].title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Guide Completed!</h3>
            <p className="text-muted-foreground">
              You've successfully completed this walkthrough.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!completed ? (
          <>
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              onClick={handleNext} 
              className="flex items-center"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Complete
                  <CheckCircle className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={handleRestart} className="flex-1">
              Restart Guide
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default InteractiveGuide;
