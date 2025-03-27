
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink } from "lucide-react";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import type { Email } from "@/types/email";

interface AppointmentRelatedEmailsProps {
  emails: Email[];
  onViewEmail: (emailId: string) => void;
}

const AppointmentRelatedEmails = ({ emails, onViewEmail }: AppointmentRelatedEmailsProps) => {
  if (emails.length === 0) {
    return null;
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Mail className="h-4 w-4 mr-2" />
          {emails.length} Related {emails.length === 1 ? 'Email' : 'Emails'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium">Related Emails</h3>
          <div className="max-h-[200px] overflow-y-auto space-y-2">
            {emails.map((email) => (
              <div 
                key={email.id} 
                className="p-2 rounded border cursor-pointer hover:bg-muted flex justify-between items-center"
                onClick={() => onViewEmail(email.id)}
              >
                <div className="truncate">
                  <p className="font-medium truncate">{email.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {email.senderName} - {new Date(email.date).toLocaleDateString()}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AppointmentRelatedEmails;
