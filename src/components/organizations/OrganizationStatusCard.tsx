
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganizations } from "@/context/OrganizationsContext";
import { OrganizationStatus } from "@/types/organization";
import { Badge } from "@/components/ui/badge";

const OrganizationStatusCard = () => {
  const { organizations } = useOrganizations();
  
  // Count organizations by status
  const statusCount: Record<OrganizationStatus, number> = {
    "Active": 0,
    "Inactive": 0,
    "Pending": 0,
    "Archived": 0
  };
  
  organizations.forEach(org => {
    statusCount[org.status] = (statusCount[org.status] || 0) + 1;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-gray-500";
      case "Pending":
        return "bg-yellow-500";
      case "Archived":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Status</CardTitle>
        <CardDescription>Current status of all organizations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(statusCount).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(status)}>
                  {status}
                </Badge>
                <span className="text-lg font-medium">{count}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round((count / organizations.length) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationStatusCard;
