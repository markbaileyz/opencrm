
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { marked } from "marked";

// Import all markdown files
import completedFeatures from '../data/roadmap/completed-features.md?raw';
import completedFeaturesPart2 from '../data/roadmap/completed-features-part-2.md?raw';
import completedFeaturesPart3 from '../data/roadmap/completed-features-part-3.md?raw';
import healthcareFeatures from '../data/roadmap/healthcare-features.md?raw';
import nextSteps from '../data/roadmap/next-steps.md?raw';

const OpenCRMRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState("completed");
  const [showMore, setShowMore] = useState(false);

  // Parse markdown content
  const renderMarkdown = (content: string) => {
    return { __html: marked(content) };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">OpenCRM Development Roadmap</h1>
        <p className="text-muted-foreground">Tracking our progress and future development plans</p>
      </div>

      <Tabs defaultValue="completed" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="planned">Next Steps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className={`prose max-w-none ${!showMore ? 'max-h-[500px] overflow-hidden' : ''}`}>
                <div dangerouslySetInnerHTML={renderMarkdown(completedFeatures)} />
                <div dangerouslySetInnerHTML={renderMarkdown(completedFeaturesPart2)} />
                <div dangerouslySetInnerHTML={renderMarkdown(completedFeaturesPart3)} />
              </div>
              
              {!showMore && (
                <div className="flex justify-center mt-4 pb-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowMore(true)}
                    className="flex items-center gap-1"
                  >
                    Show More <ChevronDown size={16} />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={renderMarkdown(healthcareFeatures)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="planned" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={renderMarkdown(nextSteps)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          This roadmap is continuously updated as development progresses.
          <br />
          Last updated: June 15, 2023
        </p>
      </div>
    </div>
  );
};

export default OpenCRMRoadmap;
