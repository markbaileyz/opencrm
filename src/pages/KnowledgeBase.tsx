
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const KnowledgeBase = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Access articles, FAQs, and guides to help you use the platform effectively.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;
