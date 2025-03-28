
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, ArrowRightCircle, Filter } from "lucide-react";
import { format } from "date-fns";
import { WorkflowExecution } from "../../types/executionHistory";
import { formatDuration } from "./analyticsUtils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RecentExecutionsTableProps {
  executionHistory: WorkflowExecution[];
}

const RecentExecutionsTable: React.FC<RecentExecutionsTableProps> = ({ 
  executionHistory
}) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "failed">("all");
  const [sortBy, setSortBy] = useState<"recent" | "duration" | "steps">("recent");
  
  const filteredExecutions = executionHistory.filter(execution => {
    if (statusFilter === "all") return true;
    return statusFilter === "success" ? execution.success : !execution.success;
  });
  
  const sortedExecutions = [...filteredExecutions].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "duration") {
      return (b.duration || 0) - (a.duration || 0);
    } else {
      return (b.stepCount || 0) - (a.stepCount || 0);
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Workflow Executions</CardTitle>
            <CardDescription>Details of the most recent workflow executions</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-[120px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Successful</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-[120px]">
                <Clock className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="steps">Steps</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
                <th className="text-left font-medium p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedExecutions.slice(0, 10).map((execution) => (
                <tr key={execution.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-2 font-medium">{execution.workflowName}</td>
                  <td className="p-2">
                    <Badge variant="outline" className="capitalize">
                      {execution.category || "Uncategorized"}
                    </Badge>
                  </td>
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
                  <td className="p-2">
                    {execution.stepCount ? (
                      <>
                        {execution.completedSteps !== undefined 
                          ? `${execution.completedSteps}/${execution.stepCount}` 
                          : execution.stepCount}
                      </>
                    ) : "N/A"}
                  </td>
                  <td className="p-2">{format(new Date(execution.timestamp), "MMM d, yyyy HH:mm")}</td>
                  <td className="p-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ArrowRightCircle className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                  </td>
                </tr>
              ))}
              
              {sortedExecutions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-muted-foreground">
                    No executions found matching the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      {executionHistory.length > 10 && (
        <CardFooter className="flex justify-center border-t p-2">
          <Button variant="outline" size="sm">View All Executions</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default RecentExecutionsTable;
