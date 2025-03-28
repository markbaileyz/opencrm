
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, MessageSquare } from "lucide-react";
import { useGuide } from "@/contexts/GuideContext";

const GuideCardsGrid: React.FC = () => {
  const { guides, startGuide } = useGuide();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Interactive Walkthroughs
          </CardTitle>
          <CardDescription>Step-by-step guides to learn functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Our interactive walkthroughs provide real-time guidance as you navigate the application.
          </p>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start" onClick={() => startGuide("new-patient-workflow")}>
              <span className="mr-auto">New Patient Workflow</span>
              <Badge variant="secondary">{guides.find(g => g.id === "new-patient-workflow")?.steps.length || 0} steps</Badge>
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => startGuide("patient-health-tracking")}>
              <span className="mr-auto">Health Tracking</span>
              <Badge variant="secondary">{guides.find(g => g.id === "patient-health-tracking")?.steps.length || 0} steps</Badge>
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => startGuide("office-management")}>
              <span className="mr-auto">Office Management</span>
              <Badge variant="secondary">{guides.find(g => g.id === "office-management")?.steps.length || 0} steps</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Video className="mr-2 h-5 w-5 text-primary" />
            Video Tutorials
          </CardTitle>
          <CardDescription>Watch comprehensive video tutorials</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Video tutorials provide detailed explanations of features and workflows.
          </p>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start">
              <span className="mr-auto">Getting Started</span>
              <Badge variant="secondary">5:32</Badge>
            </Button>
            <Button variant="outline" className="justify-start">
              <span className="mr-auto">Advanced Features</span>
              <Badge variant="secondary">8:45</Badge>
            </Button>
            <Button variant="outline" className="justify-start">
              <span className="mr-auto">Workflow Automation</span>
              <Badge variant="secondary">12:10</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Community Forums
          </CardTitle>
          <CardDescription>Connect with other users and experts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Join discussions, ask questions, and share your knowledge with the community.
          </p>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start">
              <span className="mr-auto">General Discussion</span>
              <Badge variant="secondary">24</Badge>
            </Button>
            <Button variant="outline" className="justify-start">
              <span className="mr-auto">Feature Requests</span>
              <Badge variant="secondary">15</Badge>
            </Button>
            <Button variant="outline" className="justify-start">
              <span className="mr-auto">Help & Support</span>
              <Badge variant="secondary">32</Badge>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideCardsGrid;
