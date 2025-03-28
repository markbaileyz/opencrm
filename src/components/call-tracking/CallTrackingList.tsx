
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  PlusCircle, 
  MoreHorizontal, 
  Phone,
  Clock,
  Calendar,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, formatDistanceToNow } from "date-fns";
import { CallRecord } from "@/types/call";

interface CallTrackingListProps {
  calls: CallRecord[];
  onViewCallDetails: (callId: string) => void;
  onCreateCall: () => void;
  onDeleteCall: (callId: string) => void;
  onEditCall: (callId: string) => void;
}

const CallTrackingList: React.FC<CallTrackingListProps> = ({
  calls,
  onViewCallDetails,
  onCreateCall,
  onDeleteCall,
  onEditCall,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCalls = calls.filter((call) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      call.contactName.toLowerCase().includes(searchLower) ||
      call.patientName?.toLowerCase().includes(searchLower) ||
      call.phoneNumber.includes(searchQuery) ||
      call.purpose?.toLowerCase().includes(searchLower) ||
      call.notes?.toLowerCase().includes(searchLower)
    );
  });

  const getCallTypeBadge = (type: string) => {
    switch (type) {
      case "incoming":
        return <Badge className="bg-green-500">Incoming</Badge>;
      case "outgoing":
        return <Badge className="bg-blue-500">Outgoing</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return "N/A";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }
    
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={onCreateCall}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Log Call
        </Button>
      </div>

      {filteredCalls.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{call.contactName}</div>
                      <div className="text-sm text-muted-foreground">{call.phoneNumber}</div>
                      {call.patientName && (
                        <div className="text-xs text-muted-foreground">
                          Patient: {call.patientName}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getCallTypeBadge(call.type)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(call.timestamp), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(call.timestamp), 'h:mm a')}
                    </div>
                  </TableCell>
                  <TableCell>{formatDuration(call.duration)}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {call.purpose || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewCallDetails(call.id)}>
                          <Phone className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditCall(call.id)}>
                          <Clock className="h-4 w-4 mr-2" />
                          Edit Call
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDeleteCall(call.id)} className="text-destructive">
                          <Calendar className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border rounded-md p-8 bg-muted/10">
          <Phone className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No calls found</h3>
          <p className="text-muted-foreground text-center mb-4 max-w-md">
            {searchQuery 
              ? "No calls match your search criteria. Try different keywords or clear your search."
              : "There are no calls recorded yet. Start by logging a new call."}
          </p>
          <Button onClick={onCreateCall}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Log Call
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallTrackingList;
