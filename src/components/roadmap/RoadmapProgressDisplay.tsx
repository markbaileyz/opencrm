
import React from "react";
import { roadmapProgress } from "@/data/roadmap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoadmapProgressDisplay: React.FC = () => {
  const { completedFeatures, nextSteps, knownIssues, lastUpdated } = roadmapProgress;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Roadmap Feature Progress</CardTitle>
        <CardDescription>
          Track the development status of our CRM platform features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="completed">
          <TabsList className="mb-4">
            <TabsTrigger value="completed">Completed Features ({completedFeatures.length})</TabsTrigger>
            <TabsTrigger value="next">Next Steps ({nextSteps.length})</TabsTrigger>
            <TabsTrigger value="issues">Known Issues ({knownIssues.length})</TabsTrigger>
            <TabsTrigger value="updates">Latest Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="space-y-6">
            {completedFeatures.map((category) => (
              <div key={category.id} className="mb-4">
                <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                <ul className="pl-5 list-disc space-y-1">
                  {category.items.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
                {category.id < completedFeatures.length && <Separator className="mt-4" />}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="next" className="space-y-6">
            {nextSteps.map((category) => (
              <div key={category.id} className="mb-4">
                <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                <ul className="pl-5 list-disc space-y-1">
                  {category.items.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
                {category.id < nextSteps.length && <Separator className="mt-4" />}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="issues">
            {knownIssues.length > 0 ? (
              <ul className="pl-5 list-disc space-y-2">
                {knownIssues.map((issue, index) => (
                  <li key={index} className="text-muted-foreground">{issue}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No known issues at this time.</p>
            )}
          </TabsContent>

          <TabsContent value="updates">
            <div className="mb-2">
              <span className="font-medium">Last Updated:</span> {lastUpdated.date}
            </div>
            <div className="space-y-3">
              <h3 className="text-md font-medium">Recent Changes:</h3>
              <ul className="pl-5 list-disc space-y-1">
                {lastUpdated.changes.map((change, index) => (
                  <li key={index} className="text-muted-foreground">{change}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RoadmapProgressDisplay;
