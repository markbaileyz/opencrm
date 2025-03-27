
import React from 'react';
import { ContactActivity } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactActivityLogProps {
  activities: ContactActivity[];
  onAddActivity?: (type: ContactActivity["type"]) => void;
  className?: string;
  maxHeight?: string;
}

const ContactActivityLog = ({
  activities = [],
  onAddActivity,
  className,
  maxHeight = "350px"
}: ContactActivityLogProps) => {
  const getActivityIcon = (type: ContactActivity["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "call":
        return <Phone className="h-4 w-4 text-green-500" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "note":
        return <FileText className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Activity Log</CardTitle>
          
          {onAddActivity && (
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" onClick={() => onAddActivity("email")}>
                <Mail className="h-3.5 w-3.5 mr-1" />
                Email
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddActivity("call")}>
                <Phone className="h-3.5 w-3.5 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddActivity("meeting")}>
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Meeting
              </Button>
              <Button size="sm" variant="outline" onClick={() => onAddActivity("note")}>
                <FileText className="h-3.5 w-3.5 mr-1" />
                Note
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`pr-4 ${maxHeight ? `max-h-[${maxHeight}]` : ''}`}>
          {activities && activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="border-l-2 border-muted pl-4 relative">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-background border-2 border-muted" />
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-muted/30">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium capitalize">{activity.type}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(activity.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No activities recorded yet
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ContactActivityLog;
