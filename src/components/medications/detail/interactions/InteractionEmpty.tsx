
import React from "react";
import { AlertTriangle } from "lucide-react";

const InteractionEmpty: React.FC = () => {
  return (
    <div className="text-center p-6 bg-muted/20 rounded-md">
      <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
      <p className="font-medium">No known interactions</p>
      <p className="text-sm text-muted-foreground mt-1">
        No known interactions with other medications have been identified for this medication.
      </p>
    </div>
  );
};

export default InteractionEmpty;
