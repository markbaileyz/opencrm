
import React, { useState } from "react";
import { useGuide } from "@/contexts/GuideContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, BookMarked, ArrowRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import GuideBuilderDialog from "./GuideBuilderDialog";

const DashboardGuidesSection: React.FC = () => {
  const { guides, startGuide } = useGuide();
  const [showGuideBuilder, setShowGuideBuilder] = useState(false);
  
  // Get a mix of guides across categories for featuring
  const getFeatureGuides = () => {
    const categories = Array.from(new Set(guides.map(g => g.category)));
    
    // Get one guide from each of the first 3 categories
    const featuredGuides = categories.slice(0, 3).map(category => {
      return guides.find(g => g.category === category);
    }).filter(Boolean);
    
    // Add other guides if we don't have enough
    if (featuredGuides.length < 3 && guides.length > 0) {
      guides.forEach(guide => {
        if (featuredGuides.length < 3 && !featuredGuides.includes(guide)) {
          featuredGuides.push(guide);
        }
      });
    }
    
    return featuredGuides;
  };

  const featuredGuides = getFeatureGuides();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Interactive Guides</CardTitle>
            <CardDescription>
              Step-by-step walkthroughs to help you learn the system
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowGuideBuilder(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Guide
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden">
                <div className="bg-muted h-32 flex items-center justify-center">
                  <BookMarked className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{guide.category}</Badge>
                    <Badge variant="secondary">
                      {guide.steps.length} {guide.steps.length === 1 ? "step" : "steps"}
                    </Badge>
                  </div>
                  <h3 className="font-medium mb-2 line-clamp-2">{guide.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {guide.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => startGuide(guide.id)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {featuredGuides.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No guides available yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first guide to help users learn how to use the system
                </p>
                <Button onClick={() => setShowGuideBuilder(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Guide
                </Button>
              </div>
            )}
          </div>
          
          {featuredGuides.length > 0 && (
            <div className="flex justify-end mt-4">
              <Button variant="link" asChild className="gap-1">
                <a href="/guides">
                  View all guides
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <GuideBuilderDialog
        open={showGuideBuilder}
        onOpenChange={setShowGuideBuilder}
      />
    </>
  );
};

export default DashboardGuidesSection;
