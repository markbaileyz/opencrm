
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGuide } from "@/contexts/GuideContext";

const AllGuidesSection: React.FC = () => {
  const { guides, startGuide } = useGuide();
  const categories = Array.from(new Set(guides.map(guide => guide.category)));

  return (
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
  );
};

export default AllGuidesSection;
