
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailIntegrationSectionProps {
  onGoToEmail: () => void;
}

const EmailIntegrationSection = ({ onGoToEmail }: EmailIntegrationSectionProps) => {
  const { toast } = useToast();
  
  const handleSendAllReminders = () => {
    toast({
      title: "Reminder emails sent",
      description: "Reminder emails have been sent for tomorrow's appointments",
      variant: "success"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email & Calendar Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Create appointments from emails</h3>
              <p className="text-sm text-muted-foreground">
                Schedule follow-up meetings directly from your email inbox
              </p>
            </div>
            <Button onClick={onGoToEmail}>
              Go to Email
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Send email reminders</h3>
              <p className="text-sm text-muted-foreground">
                Automatically send email reminders for upcoming appointments
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={handleSendAllReminders}
            >
              Send All Reminders
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailIntegrationSection;
