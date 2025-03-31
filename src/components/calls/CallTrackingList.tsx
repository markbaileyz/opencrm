
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
  Phone, 
  PhoneOutgoing, 
  PhoneIncoming, 
  PhoneMissed,
  Search, 
  PlusCircle, 
  Clock,
  Calendar
} from "lucide-react";
import { CallRecord } from "@/types/call";
import { formatDistanceToNow, format } from "date-fns";

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
  onEditCall
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCalls = calls.filter((call) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      call.notes?.toLowerCase().includes(searchLower) ||
      call.patientName?.toLowerCase().includes(searchLower) ||
      call.contactName.toLowerCase().includes(searchLower) ||
      call.phoneNumber.toLowerCase().includes(searchLower) ||
      (call.tags && call.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  });

  const getCallStatusBadge = (type: string) => {
    switch (type) {
      case "incoming":
        return <Badge className="bg-green-500">Incoming</Badge>;
      case "outgoing":
        return <Badge className="bg-blue-500">Outgoing</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const getCallDirectionIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-green-500" />;
      case "outgoing":
        return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "N/A";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{getCallStatusBadge(call.type)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {format(new Date(call.timestamp), 'MMM dd, yyyy')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(call.timestamp), 'h:mm a')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getCallDirectionIcon(call.type)}
                      <span>{call.contactName}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {call.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    {call.type !== "missed" ? (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{formatDuration(call.duration)}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{call.purpose || "-"}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={call.notes}>
                      {call.notes || "-"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewCallDetails(call.id)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEditCall(call.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700" 
                      onClick={() => onDeleteCall(call.id)}
                    >
                      Delete
                    </Button>
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
              : "There are no call records yet. Start by logging a new call."}
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
