
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Guide } from '@/types/guide';

interface InteractiveGuidePreviewProps {
  guide: Guide;
}

const InteractiveGuidePreview: React.FC<InteractiveGuidePreviewProps> = ({ guide }) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = () => {
    switch (guide.difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleStartGuide = () => {
    navigate(`/guides/${guide.id}`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={getDifficultyColor()}>
            {guide.difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {guide.estimatedTime}
          </Badge>
        </div>
        <CardTitle className="mt-2">{guide.title}</CardTitle>
        <CardDescription>{guide.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{guide.steps.length} steps</span>
        </div>
        {guide.coverImage && (
          <div className="mt-2 rounded-md overflow-hidden border">
            <img 
              src={guide.coverImage} 
              alt={guide.title} 
              className="w-full h-32 object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full flex justify-between items-center">
          <Badge variant="secondary">{guide.category}</Badge>
          <Button onClick={handleStartGuide} className="flex items-center gap-1">
            Start Guide
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InteractiveGuidePreview;
