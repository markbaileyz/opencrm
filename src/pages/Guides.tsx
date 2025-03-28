
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Guides = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Guides</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            View helpful guides and tutorials for using the platform. This feature is coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Guides;
