
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data for top callers
const topCallers = [
  { id: "1", name: "Sarah Johnson", organization: "Regional Health Partners", calls: 24, averageDuration: 285, mostRecentCall: "2023-07-15T14:30:00Z" },
  { id: "2", name: "Michael Chen", organization: "Westside Medical Group", calls: 18, averageDuration: 342, mostRecentCall: "2023-07-14T11:15:00Z" },
  { id: "3", name: "Jessica Martinez", organization: "Allied Healthcare Services", calls: 15, averageDuration: 195, mostRecentCall: "2023-07-13T09:45:00Z" },
  { id: "4", name: "David Wilson", organization: "City General Hospital", calls: 12, averageDuration: 420, mostRecentCall: "2023-07-12T16:20:00Z" },
  { id: "5", name: "Emily Taylor", organization: "Sunrise Senior Living", calls: 10, averageDuration: 310, mostRecentCall: "2023-07-11T13:10:00Z" }
];

const TopCallersList = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .toUpperCase();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Callers</CardTitle>
        <CardDescription>People and organizations with the most call activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caller</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead className="text-right">Call Count</TableHead>
              <TableHead className="text-right">Avg. Duration</TableHead>
              <TableHead className="text-right">Last Call</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCallers.map(caller => (
              <TableRow key={caller.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(caller.name)}</AvatarFallback>
                    </Avatar>
                    <span>{caller.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {caller.organization}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{caller.calls}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatDuration(caller.averageDuration)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDate(caller.mostRecentCall)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopCallersList;
