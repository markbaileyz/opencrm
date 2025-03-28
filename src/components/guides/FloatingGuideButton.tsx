
import React, { useState } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Button } from "@/components/ui/button";
import { HelpCircle, X, BookOpen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import GuideBuilderDialog from "./GuideBuilderDialog";

const FloatingGuideButton: React.FC = () => {
  const { guides, startGuide, isGuideActive } = useGuide();
  const [showGuideBuilder, setShowGuideBuilder] = useState(false);
  
  // Get featured guides (first 3)
  const featuredGuides = guides.slice(0, 3);

  if (isGuideActive) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
            >
              <HelpCircle className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-72">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Interactive Guides</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/guides">View All</a>
                </Button>
              </div>
              <Separator />
              {featuredGuides.length > 0 ? (
                <div className="space-y-2 py-2">
                  {featuredGuides.map((guide) => (
                    <Button
                      key={guide.id}
                      variant="ghost"
                      className="w-full justify-start h-auto py-2"
                      onClick={() => startGuide(guide.id)}
                    >
                      <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">{guide.name}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-2">
                  No guides available yet
                </p>
              )}
              <Separator />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowGuideBuilder(true)}
              >
                Create New Guide
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <GuideBuilderDialog
        open={showGuideBuilder}
        onOpenChange={setShowGuideBuilder}
      />
    </>
  );
};

export default FloatingGuideButton;
