
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface WorkflowErrorProps {
  error: Error;
  isLoad?: boolean;
  onRetry?: () => void;
}

const WorkflowError: React.FC<WorkflowErrorProps> = ({ 
  error, 
  isLoad = false,
  onRetry 
}) => {
  return (
    <div className="my-6">
      <Alert variant="destructive">
        <AlertTitle>
          {isLoad ? "Error Loading Workflows" : "Error Saving Workflows"}
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error.message}</p>
          {onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              className="self-start"
              onClick={onRetry}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default WorkflowError;
