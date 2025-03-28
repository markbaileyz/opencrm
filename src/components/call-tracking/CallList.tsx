
import React from "react";
import { CallRecord } from "@/types/call";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, User, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CallListProps {
  calls: CallRecord[];
  onEditCall: (id: string) => void;
  onFollowUp: (id: string) => void;
  onDeleteCall: (id: string) => void;
}

const CallList: React.FC<CallListProps> = ({
  calls,
  onEditCall,
  onFollowUp,
  onDeleteCall
}) => {
  const getCallIcon = (call: CallRecord) => {
    switch (call.type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-blue-500" />;
      case "outgoing":
        return <PhoneOutgoing className="h-4 w-4 text-green-500" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (call: CallRecord) => {
    switch (call.type) {
      case "incoming":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Incoming</Badge>;
      case "outgoing":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Outgoing</Badge>;
      case "missed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {calls.length > 0 ? (
            calls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getCallIcon(call)}
                  </div>
                  <div>
                    <p className="font-medium">{call.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{call.phone}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDistanceToNow(new Date(call.date), { addSuffix: true })}</span>
                      <span className="mx-1">•</span>
                      <span>{call.duration} seconds</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(call)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditCall(call.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onFollowUp(call.id)}>
                        Follow Up
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteCall(call.id)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No call records found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CallList;
