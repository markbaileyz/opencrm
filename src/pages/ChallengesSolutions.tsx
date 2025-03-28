
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ChallengesSolutions = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Challenges & Solutions</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Find solutions to common healthcare CRM challenges. This feature is coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengesSolutions;
