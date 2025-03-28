
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const GuidesHeader: React.FC = () => {
  return (
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
  );
};

export default GuidesHeader;
