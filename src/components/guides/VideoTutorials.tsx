
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoPlayer from "./VideoPlayer";
import { VideoTutorial } from "@/types/video-tutorial";
import { Clock, Tag } from "lucide-react";

// Sample tutorial data - In a real app, this would come from an API
const sampleTutorials: VideoTutorial[] = [
  {
    id: "1",
    title: "Getting Started with Patient Management",
    description: "Learn the basics of adding and managing patient records in the system.",
    category: "Patients",
    duration: "5:32",
    thumbnailUrl: "/placeholder.svg",
    videoUrl: "https://www.example.com/videos/patient-management",
    tags: ["beginner", "essential"]
  },
  {
    id: "2",
    title: "Advanced Search Techniques",
    description: "Master the powerful search capabilities to quickly find patient information.",
    category: "Patients",
    duration: "4:15",
    thumbnailUrl: "/placeholder.svg",
    videoUrl: "https://www.example.com/videos/advanced-search",
    tags: ["intermediate", "productivity"]
  },
  {
    id: "3",
    title: "Creating Custom Reports",
    description: "Design and schedule custom reports to analyze your practice data.",
    category: "Reports",
    duration: "8:45",
    thumbnailUrl: "/placeholder.svg",
    videoUrl: "https://www.example.com/videos/custom-reports",
    tags: ["advanced", "analytics"]
  },
  {
    id: "4",
    title: "Managing Office Resources",
    description: "Learn how to efficiently manage rooms and equipment scheduling.",
    category: "Office",
    duration: "6:20",
    thumbnailUrl: "/placeholder.svg",
    videoUrl: "https://www.example.com/videos/office-resources",
    tags: ["intermediate", "management"]
  },
  {
    id: "5",
    title: "Setting Up Automated Workflows",
    description: "Create powerful automation rules to streamline repetitive tasks.",
    category: "Workflows",
    duration: "12:10",
    thumbnailUrl: "/placeholder.svg",
    videoUrl: "https://www.example.com/videos/automated-workflows",
    tags: ["advanced", "automation"]
  },
  {
    id: "6",
    title: "Health Tracker Introduction",
    description: "Overview of the Health Tracker module and its key features.",
    category: "Health",
    duration: "7:45",
    thumbnailUrl: "/placeholder.svg",
    videoUrl: "https://www.example.com/videos/health-tracker-intro",
    tags: ["beginner", "health"]
  }
];

const VideoTutorials: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<VideoTutorial | null>(null);
  const categories = Array.from(new Set(sampleTutorials.map(tutorial => tutorial.category)));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Video Tutorials</CardTitle>
        <CardDescription>
          Watch step-by-step video guides to learn how to use the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {selectedTutorial ? (
                <VideoPlayer tutorial={selectedTutorial} onClose={() => setSelectedTutorial(null)} />
              ) : (
                <div className="flex items-center justify-center h-[300px] bg-muted rounded-md">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Select a tutorial to start watching</p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <ScrollArea className="h-[300px] rounded-md border">
                <div className="p-4 space-y-4">
                  <h3 className="font-medium mb-2">Tutorial Library</h3>
                  {sampleTutorials.map(tutorial => (
                    <div 
                      key={tutorial.id} 
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedTutorial?.id === tutorial.id 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedTutorial(tutorial)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                          <img 
                            src={tutorial.thumbnailUrl} 
                            alt={tutorial.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">{tutorial.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {tutorial.duration}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {tutorial.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tutorial.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs px-1 py-0 h-4"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VideoTutorials;
