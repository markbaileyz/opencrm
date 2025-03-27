
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Organization } from "@/types/organization";

interface StatusOverviewProps {
  organizations: Organization[];
}

const StatusOverview: React.FC<StatusOverviewProps> = ({ organizations }) => {
  // Count organizations by status
  const statusCount: Record<string, number> = {
    "Active": 0,
    "Inactive": 0,
    "Pending": 0,
    "Archived": 0
  };
  
  organizations.forEach(org => {
    statusCount[org.status] = (statusCount[org.status] || 0) + 1;
  });
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(statusCount).map(([status, count]) => (
        <div key={status} className="flex flex-col p-4 border rounded-lg">
          <span className="text-sm text-muted-foreground">{status}</span>
          <span className="text-2xl font-semibold">{count}</span>
          <div className="mt-2">
            <Progress 
              value={Math.round((count / organizations.length) * 100)} 
              className="h-1.5"
              style={{
                background: "hsl(var(--secondary))",
              }}
              indicatorStyle={{
                background: status === "Active" ? "hsl(var(--success))" :
                          status === "Inactive" ? "hsl(var(--muted-foreground))" :
                          status === "Pending" ? "hsl(var(--warning))" :
                          "hsl(var(--destructive))"
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            {Math.round((count / organizations.length) * 100)}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatusOverview;
