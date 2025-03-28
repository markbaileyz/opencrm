
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import GuideCatalog from "./GuideCatalog";

const GuideButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-40 rounded-full w-10 h-10 p-0"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
      <GuideCatalog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default GuideButton;
