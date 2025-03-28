
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "The patient you're looking for doesn't exist or you don't have permission to view it." 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center h-40">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold">Patient Not Found</h2>
          <p className="text-muted-foreground">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorState;
