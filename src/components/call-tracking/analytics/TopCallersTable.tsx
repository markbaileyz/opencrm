
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CallRecord } from "@/types/call";
import { Badge } from "@/components/ui/badge";

interface TopCallersTableProps {
  calls: CallRecord[];
}

interface CallerSummary {
  name: string;
  phoneNumber: string;
  totalCalls: number;
  incoming: number;
  outgoing: number;
  missed: number;
  averageDuration: number;
}

const TopCallersTable: React.FC<TopCallersTableProps> = ({ calls }) => {
  // Process and summarize call data by contact
  const callerMap = new Map<string, CallerSummary>();
  
  calls.forEach(call => {
    const { contactName, phoneNumber, type, duration } = call;
    const key = `${contactName}:${phoneNumber}`;
    
    if (!callerMap.has(key)) {
      callerMap.set(key, {
        name: contactName,
        phoneNumber,
        totalCalls: 0,
        incoming: 0,
        outgoing: 0,
        missed: 0,
        averageDuration: 0
      });
    }
    
    const caller = callerMap.get(key)!;
    caller.totalCalls += 1;
    
    if (type === "incoming") caller.incoming += 1;
    else if (type === "outgoing") caller.outgoing += 1;
    else if (type === "missed") caller.missed += 1;
    
    // Update average duration
    if (duration && type !== "missed") {
      const validCalls = caller.incoming + caller.outgoing;
      const currentTotalDuration = caller.averageDuration * (validCalls - 1);
      caller.averageDuration = (currentTotalDuration + duration) / validCalls;
    }
  });
  
  // Convert to array and sort by total calls
  const topCallers = Array.from(callerMap.values())
    .sort((a, b) => b.totalCalls - a.totalCalls)
    .slice(0, 10);
  
  if (topCallers.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No call data available</div>;
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead className="text-center">Total Calls</TableHead>
          <TableHead className="text-center">Incoming</TableHead>
          <TableHead className="text-center">Outgoing</TableHead>
          <TableHead className="text-center">Missed</TableHead>
          <TableHead className="text-right">Avg. Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topCallers.map((caller) => (
          <TableRow key={`${caller.name}:${caller.phoneNumber}`}>
            <TableCell>
              <div className="font-medium">{caller.name}</div>
              <div className="text-sm text-muted-foreground">{caller.phoneNumber}</div>
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="outline">{caller.totalCalls}</Badge>
            </TableCell>
            <TableCell className="text-center">{caller.incoming}</TableCell>
            <TableCell className="text-center">{caller.outgoing}</TableCell>
            <TableCell className="text-center">{caller.missed}</TableCell>
            <TableCell className="text-right">
              {Math.floor(caller.averageDuration / 60)}m {Math.round(caller.averageDuration % 60)}s
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopCallersTable;
