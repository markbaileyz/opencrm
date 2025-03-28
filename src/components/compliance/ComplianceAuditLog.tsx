
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download, Search } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  resource: string;
  details: string;
  severity: "low" | "medium" | "high" | "critical";
}

const ComplianceAuditLog: React.FC = () => {
  // Sample audit log data
  const auditLogs: AuditLogEntry[] = [
    {
      id: "log-1",
      timestamp: "2023-11-01T08:30:45Z",
      action: "Patient Record Access",
      user: "Dr. Sarah Johnson",
      resource: "Patient #12345",
      details: "Accessed patient medical history",
      severity: "low"
    },
    {
      id: "log-2",
      timestamp: "2023-11-02T14:22:10Z",
      action: "Failed Login Attempt",
      user: "Unknown",
      resource: "System",
      details: "Multiple failed login attempts detected",
      severity: "medium"
    },
    {
      id: "log-3",
      timestamp: "2023-11-03T11:15:32Z",
      action: "Permission Change",
      user: "Admin User",
      resource: "User Roles",
      details: "Changed permissions for role 'Receptionist'",
      severity: "high"
    },
    {
      id: "log-4",
      timestamp: "2023-11-05T09:45:20Z",
      action: "Data Export",
      user: "James Wilson",
      resource: "Patient Database",
      details: "Exported patient contact information",
      severity: "medium"
    },
    {
      id: "log-5",
      timestamp: "2023-11-07T16:33:51Z",
      action: "System Configuration",
      user: "System Administrator",
      resource: "Security Settings",
      details: "Modified password policy settings",
      severity: "high"
    },
    {
      id: "log-6",
      timestamp: "2023-11-10T13:27:18Z",
      action: "Unauthorized Access Attempt",
      user: "External IP",
      resource: "API Endpoint",
      details: "Attempted to access restricted API endpoint",
      severity: "critical"
    }
  ];

  const getSeverityColor = (severity: "low" | "medium" | "high" | "critical") => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Audit Log</CardTitle>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search logs..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">
                  <div className="flex items-center">
                    Timestamp
                    <ArrowUpDown className="h-3 w-3 ml-1" />
                  </div>
                </th>
                <th className="text-left p-2">Action</th>
                <th className="text-left p-2">User</th>
                <th className="text-left p-2">Resource</th>
                <th className="text-left p-2">Details</th>
                <th className="text-left p-2">Severity</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-muted/50">
                  <td className="p-2">{format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")}</td>
                  <td className="p-2 font-medium">{log.action}</td>
                  <td className="p-2">{log.user}</td>
                  <td className="p-2">{log.resource}</td>
                  <td className="p-2">{log.details}</td>
                  <td className="p-2">
                    <Badge variant="outline" className={getSeverityColor(log.severity)}>
                      {log.severity}
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

export default ComplianceAuditLog;
