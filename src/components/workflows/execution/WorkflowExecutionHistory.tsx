
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkflowExecution } from "../hooks/useExecutionHistory";

interface WorkflowExecutionHistoryProps {
  history: WorkflowExecution[];
  onClear: () => void;
}

const WorkflowExecutionHistory: React.FC<WorkflowExecutionHistoryProps> = ({
  history,
  onClear
}) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No execution history available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Recent Executions</h3>
        <Button variant="outline" size="sm" onClick={onClear}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {history.map((execution) => (
            <div 
              key={execution.id} 
              className="flex items-center justify-between p-3 rounded-md border bg-card"
            >
              <div className="flex items-center space-x-3">
                {execution.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{execution.workflowName}</p>
                  <p className="text-sm text-muted-foreground">{execution.message}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {format(new Date(execution.timestamp), "MMM d, yyyy HH:mm")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default WorkflowExecutionHistory;
