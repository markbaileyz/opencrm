
import React from 'react';
import { format, isPast, isToday } from 'date-fns';
import { FollowUp, ContactPriority } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactPriorityBadge from "./ContactPriorityBadge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FollowUpReminderProps {
  followUp: FollowUp;
  onComplete: (followUpId: string) => void;
  onReschedule: (followUpId: string) => void;
  className?: string;
}

const FollowUpReminder = ({
  followUp,
  onComplete,
  onReschedule,
  className
}: FollowUpReminderProps) => {
  const dueDate = new Date(followUp.dueDate);
  const isOverdue = isPast(dueDate) && !isToday(dueDate);
  const isDueToday = isToday(dueDate);
  
  const getStatusBadge = () => {
    switch (followUp.status) {
      case "pending":
        return (
          <Badge variant={isOverdue ? "destructive" : isDueToday ? "warning" : "outline"} className="ml-2">
            <Clock className="h-3 w-3 mr-1" />
            {isOverdue ? "Overdue" : isDueToday ? "Due Today" : "Pending"}
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="ml-2">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("border", {
      "border-red-300 bg-red-50 dark:bg-red-950/20": isOverdue && followUp.status === "pending",
      "border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20": isDueToday && followUp.status === "pending",
      "border-green-300 bg-green-50 dark:bg-green-950/20": followUp.status === "completed"
    }, className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Follow-up Reminder
            {getStatusBadge()}
          </CardTitle>
          <ContactPriorityBadge priority={followUp.priority} size="sm" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {format(dueDate, 'PPP')}
          </div>
          <p className="text-sm">{followUp.description}</p>
          
          {followUp.status !== "completed" && (
            <div className="flex space-x-2 mt-4">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onReschedule(followUp.id)}
              >
                Reschedule
              </Button>
              <Button 
                size="sm" 
                onClick={() => onComplete(followUp.id)}
              >
                Mark Complete
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUpReminder;
