
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RoadmapCTA: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Want to see the CRM in action?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        Try out the existing features and provide feedback to help us improve.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contacts">Manage Contacts</Link>
        </Button>
      </div>
    </div>
  );
};

export default RoadmapCTA;
