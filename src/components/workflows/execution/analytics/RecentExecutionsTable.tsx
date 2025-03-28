
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { WorkflowExecution } from "../../types/executionHistory";
import { formatDuration } from "./analyticsUtils";

interface RecentExecutionsTableProps {
  executionHistory: WorkflowExecution[];
}

const RecentExecutionsTable: React.FC<RecentExecutionsTableProps> = ({ 
  executionHistory
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Workflow Executions</CardTitle>
        <CardDescription>Details of the most recent workflow executions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Workflow</th>
                <th className="text-left font-medium p-2">Category</th>
                <th className="text-left font-medium p-2">Status</th>
                <th className="text-left font-medium p-2">Duration</th>
                <th className="text-left font-medium p-2">Steps</th>
                <th className="text-left font-medium p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {executionHistory.slice(0, 10).map((execution) => (
                <tr key={execution.id} className="border-b">
                  <td className="p-2">{execution.workflowName}</td>
                  <td className="p-2">{execution.category || "Uncategorized"}</td>
                  <td className="p-2">
                    {execution.success ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Success
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <XCircle className="h-4 w-4 mr-1" />
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="p-2">{execution.duration ? formatDuration(execution.duration) : "N/A"}</td>
                  <td className="p-2">{execution.stepCount || "N/A"}</td>
                  <td className="p-2">{format(new Date(execution.timestamp), "MMM d, yyyy HH:mm")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExecutionsTable;
