
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, Phone, Calendar, FileText, MessageSquare, 
  User, Clock, Search, ArrowDownUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Interaction {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'message';
  date: string;
  contact: string;
  content: string;
  user: string;
}

interface OrganizationInteractionHistoryProps {
  organizationId: string;
  expanded?: boolean;
}

const OrganizationInteractionHistory: React.FC<OrganizationInteractionHistoryProps> = ({ 
  organizationId,
  expanded = false 
}) => {
  // Mock interactions data - in a real app this would come from an API
  const interactions: Interaction[] = [
    {
      id: "1",
      type: "email",
      date: "2024-05-01T10:30:00",
      contact: "John Smith",
      content: "Sent proposal for the new enterprise package",
      user: "Alex Johnson"
    },
    {
      id: "2",
      type: "call",
      date: "2024-04-28T14:15:00",
      contact: "Sarah Williams",
      content: "Discussed implementation timeline and resource requirements",
      user: "Alex Johnson"
    },
    {
      id: "3",
      type: "meeting",
      date: "2024-04-20T09:00:00",
      contact: "Mark Davis",
      content: "Product demonstration with technical team",
      user: "Emily Chen"
    },
    {
      id: "4",
      type: "note",
      date: "2024-04-15T11:45:00",
      contact: "",
      content: "They're evaluating competing solutions. Need to follow up with ROI case study.",
      user: "Alex Johnson"
    },
    {
      id: "5",
      type: "message",
      date: "2024-04-10T16:30:00",
      contact: "Sarah Williams",
      content: "Quick check-in about contract status",
      user: "Emily Chen"
    }
  ];

  // Get icon based on interaction type
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      case "meeting": return <Calendar className="h-4 w-4" />;
      case "note": return <FileText className="h-4 w-4" />;
      case "message": return <MessageSquare className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  // Get color based on interaction type
  const getInteractionColor = (type: string) => {
    switch (type) {
      case "email": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "call": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "meeting": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "note": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "message": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {expanded && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Search interactions..." 
              className="max-w-sm"
              icon={<Search className="h-4 w-4" />}
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" className="gap-1">
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span>Sort</span>
          </Button>
        </div>
      )}
      
      <div className="space-y-3">
        {interactions.map(interaction => (
          <Card key={interaction.id} className="hover:bg-muted/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className={`rounded-full p-2 ${getInteractionColor(interaction.type)}`}>
                    {getInteractionIcon(interaction.type)}
                  </div>
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">
                      {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                      {interaction.contact && <span> with {interaction.contact}</span>}
                    </h4>
                    <Badge variant="outline" className="text-xs font-normal">
                      {formatDate(interaction.date)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{interaction.content}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                    <User className="h-3 w-3" />
                    <span>{interaction.user}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{new Date(interaction.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {expanded && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="w-full">Load More</Button>
        </div>
      )}
    </div>
  );
};

export default OrganizationInteractionHistory;
