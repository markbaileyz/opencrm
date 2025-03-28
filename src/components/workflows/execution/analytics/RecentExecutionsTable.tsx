
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { WorkflowExecution } from "../../types/executionHistory";

interface RecentExecutionsTableProps {
  executionHistory: WorkflowExecution[];
}

const RecentExecutionsTable: React.FC<RecentExecutionsTableProps> = ({ executionHistory }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Executions</CardTitle>
        <CardDescription>Latest workflow execution details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium p-2">Workflow</th>
                <th className="text-left font-medium p-2">Timestamp</th>
                <th className="text-left font-medium p-2">Category</th>
                <th className="text-left font-medium p-2">Duration</th>
                <th className="text-left font-medium p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {executionHistory.slice(0, 10).map((execution) => (
                <tr key={execution.id} className="border-b hover:bg-muted/50">
                  <td className="p-2">{execution.workflowName}</td>
                  <td className="p-2">
                    {format(parseISO(execution.timestamp), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="p-2">
                    <Badge variant="outline">
                      {execution.category || "Uncategorized"}
                    </Badge>
                  </td>
                  <td className="p-2">{(execution.duration / 1000).toFixed(2)}s</td>
                  <td className="p-2">
                    <Badge variant={execution.success ? "success" : "destructive"}>
                      {execution.success ? "Success" : "Failed"}
                    </Badge>
                  </td>
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
