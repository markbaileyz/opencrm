
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useGuide } from "@/contexts/GuideContext";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, MessageSquare, FileText, HelpCircle } from "lucide-react";
import VideoTutorials from "@/components/guides/VideoTutorials";
import CommunityForums from "@/components/guides/CommunityForums";

const Guides = () => {
  const { guides, startGuide } = useGuide();
  const categories = Array.from(new Set(guides.map(guide => guide.category)));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interactive Guides</h1>
            <p className="text-muted-foreground mt-1">
              Step-by-step walkthroughs to help you navigate the application
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <HelpCircle className="mr-2 h-4 w-4" />
              Request New Guide
            </Button>
          </div>
        </div>

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

        {/* Video Tutorials Section */}
        <VideoTutorials />

        {/* Community Forums Section */}
        <CommunityForums />

        {/* All Guides Section */}
        <Card>
          <CardHeader>
            <CardTitle>All Guides</CardTitle>
            <CardDescription>Browse all available interactive guides by category</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Guides</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all">
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guides.map(guide => (
                      <Card key={guide.id} className="transition-all hover:shadow-md">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{guide.name}</CardTitle>
                            <Badge className="capitalize">{guide.category}</Badge>
                          </div>
                          <CardDescription>{guide.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {guide.steps.length} {guide.steps.length === 1 ? "step" : "steps"}
                          </p>
                        </CardContent>
                        <CardContent className="pt-0 pb-4">
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => startGuide(guide.id)}
                          >
                            Start Guide
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {categories.map(category => (
                <TabsContent key={category} value={category}>
                  <ScrollArea className="h-[400px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {guides
                        .filter(guide => guide.category === category)
                        .map(guide => (
                          <Card key={guide.id} className="transition-all hover:shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-lg">{guide.name}</CardTitle>
                                <Badge className="capitalize">{guide.category}</Badge>
                              </div>
                              <CardDescription>{guide.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                {guide.steps.length} {guide.steps.length === 1 ? "step" : "steps"}
                              </p>
                            </CardContent>
                            <CardContent className="pt-0 pb-4">
                              <Button 
                                variant="outline"
                                className="w-full"
                                onClick={() => startGuide(guide.id)}
                              >
                                Start Guide
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Documentation Section */}
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Access detailed documentation for all features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">User Manual</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive user documentation</p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">API Documentation</h3>
                  <p className="text-sm text-muted-foreground">Technical API references</p>
                </div>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 text-primary mr-4" />
                <div>
                  <h3 className="font-medium">Healthcare Guides</h3>
                  <p className="text-sm text-muted-foreground">Healthcare specific workflows</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Guides;
