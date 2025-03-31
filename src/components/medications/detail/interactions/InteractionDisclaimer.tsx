
import React from "react";
import { AlertTriangle } from "lucide-react";

const InteractionDisclaimer: React.FC = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
      <p className="text-sm flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-blue-500" />
        <span className="text-blue-700 dark:text-blue-300">
          This list may not be comprehensive. Always consult with a healthcare provider.
        </span>
      </p>
    </div>
  );
};

export default InteractionDisclaimer;
