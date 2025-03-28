
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Building, FileCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AuditScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  auditor: string;
  department: string;
  status: "scheduled" | "in-progress" | "completed" | "delayed";
  type: string;
}

const scheduledAudits: AuditScheduleItem[] = [
  {
    id: "audit-1",
    title: "Annual Security Compliance Review",
    date: "2024-08-15",
    time: "09:00 AM",
    auditor: "External - SecureAudit Inc.",
    department: "IT Department",
    status: "scheduled",
    type: "External"
  },
  {
    id: "audit-2",
    title: "HIPAA Compliance Verification",
    date: "2024-07-20",
    time: "10:30 AM",
    auditor: "Sarah Johnson",
    department: "Medical Records",
    status: "scheduled",
    type: "Internal"
  },
  {
    id: "audit-3",
    title: "Data Protection Assessment",
    date: "2024-06-28",
    time: "02:00 PM",
    auditor: "James Wilson",
    department: "All Departments",
    status: "in-progress",
    type: "Internal"
  },
  {
    id: "audit-4",
    title: "Quarterly Billing Compliance Check",
    date: "2024-07-05",
    time: "11:00 AM",
    auditor: "Financial Audit Team",
    department: "Billing Department",
    status: "scheduled",
    type: "Internal"
  },
  {
    id: "audit-5",
    title: "Patient Data Access Audit",
    date: "2024-06-15",
    time: "09:30 AM",
    auditor: "Michael Roberts",
    department: "IT Department",
    status: "completed",
    type: "Internal"
  }
];

const ComplianceAuditSchedule: React.FC = () => {
  const getStatusBadge = (status: AuditScheduleItem["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Delayed</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    if (type === "External") {
      return <Badge variant="outline" className="border-purple-500 text-purple-700">External</Badge>;
    }
    return <Badge variant="outline" className="border-gray-500 text-gray-700">Internal</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Audits</h2>
        <Button>Schedule New Audit</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Audit Schedule</CardTitle>
          <CardDescription>
            Manage and track upcoming compliance audits and assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledAudits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                      {audit.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        {audit.date}
                      </span>
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {audit.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {audit.auditor}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      {audit.department}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(audit.status)}</TableCell>
                  <TableCell>{getTypeBadge(audit.type)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Audit Resources</CardTitle>
            <CardDescription>Required documents and guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-500" />
                <span>HIPAA Compliance Checklist</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-500" />
                <span>Data Security Standards</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-500" />
                <span>Audit Preparation Guidelines</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-500" />
                <span>Regulatory Requirements Reference</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Statistics</CardTitle>
            <CardDescription>Current compliance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Scheduled Audits</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>In Progress</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed (Last 30 days)</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Issues Requiring Attention</span>
                <span className="font-semibold text-amber-600">4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceAuditSchedule;
